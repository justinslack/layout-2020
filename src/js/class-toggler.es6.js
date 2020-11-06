(function () {
  const classToggler = {
    // eslint-disable-line  no-unused-vars
    // Default options
    defaultOpt: {
      classActive: '-active-toggle',
      classHidden: '-hidden-toggle',
      attrTarget: 'data-toggle-target',
      attrName: 'data-toggle-name',
      attrClass: 'data-toggle-class',
      attrFocus: 'data-toggle-focus',
      attrAbort: 'data-toggle-abort',
      attrMatch: 'data-toggle-match',
      attrGroup: 'data-toggle-group',
      attrTabs: 'data-toggle-tabs',
      eventNamespace: 'ct'
    },
    // Options (set after init)
    opt: {},

    // Initialization
    init(opt) {
      this.opt = { ...this.defaultOpt,
        ...opt
      };
      this.initClick();
      this.initAbort();
      this.initFocus();
      this.initGroup();
      this.initTabs();
    },

    // Return nodes with specific data-attribute (and its value)
    items: (type, value, operator = '=') => document.querySelectorAll(`[${type}${value ? `${operator}'${value}'` : ''}]`),

    // Return togglers (filtered by name)
    togglers(name) {
      return this.items(this.opt.attrTarget, name);
    },

    // Return toggles (filtered by name)
    toggles(name) {
      return this.items(this.opt.attrName, name);
    },

    // Handle click on toggler
    initClick() {
      document.addEventListener('click', e => {
        this.togglers().forEach(toggler => {
          if (toggler.contains(e.target)) {
            // Break if toggler doesn't match its media query
            const query = toggler.getAttribute(this.opt.attrMatch);

            if (query && !window.matchMedia(query).matches) {
              return;
            } // Break if toggler is tab and is active (tabs aren't hideable by clicking it)


            if (toggler.getAttribute(this.opt.attrTabs) && this.isClassed(toggler)) {
              return;
            }

            e.preventDefault();
            this.switch(toggler.getAttribute(this.opt.attrTarget));
            document.dispatchEvent(new Event(`${this.opt.eventNamespace}.toggled`));
          }
        });
      });
    },

    // Return CSS class for item
    resolveClass(item) {
      return item.getAttribute(this.opt.attrClass) || (this.isToggler(item) ? this.opt.classActive : this.opt.classHidden);
    },

    // Switche CSS class on toggler/toggle with specific name
    switch(name) {
      return [...this.togglers(name), ...this.toggles(name)].forEach(item => {
        item.classList.toggle(this.resolveClass(item));
        this.doItemEvent(item);
      });
    },

    // Fire event on toggled item
    // (ct.button.on / ct.button.off / ct.content.shown / ct.content.hidden)
    doItemEvent(item) {
      item.dispatchEvent(new Event(this.isToggler(item) ? `${this.opt.eventNamespace}.button.${this.isClassed(item) ? 'on' : 'off'}` : `${this.opt.eventNamespace}.content.${this.isClassed(item) ? 'hidden' : 'shown'}`));
    },

    // Item is toggler (not toggle)?
    isToggler(item) {
      return item.getAttribute(this.opt.attrTarget);
    },

    // Has toggler/toggle its toggling class?
    isClassed(item) {
      return item.classList.contains(this.resolveClass(item));
    },

    // Focus specific element when toggle is shown
    initFocus() {
      this.items(this.opt.attrFocus).forEach(item => {
        item.addEventListener(`${this.opt.eventNamespace}.content.shown`, () => {
          item.querySelector(item.getAttribute(this.opt.attrFocus)).focus();
        });
      });
    },

    // Initialize hiding toggles on clickout/pressing escape
    initAbort() {
      document.addEventListener('keydown', e => e.keyCode === 27 ? this.hide(this.items(this.opt.attrAbort, 'escape', '*=')) : false);
      document.addEventListener('click', e => this.hide(this.items(this.opt.attrAbort, 'clickout', '*='), e));
    },

    // Hide toggles
    hide(items, clickoutEvent) {
      // Loop over abort initiators
      [...new Set([...items] // Filter only active togglers
      .filter(item => item.classList.contains(this.resolveClass(item))) // Get theirs names
      .map(item => item.getAttribute(this.opt.attrTarget)) // Filter only names of togglers/toggles which aren't target of click event
      .filter(name => {
        let prevent = false;
        [...this.togglers(name), ...this.toggles(name)].forEach(target => {
          if (clickoutEvent && target.contains(clickoutEvent.target)) {
            prevent = true;
            return false;
          }

          return true;
        });
        return !prevent;
      }))].forEach(name => this.switch(name)); // Hide
    },

    // Keep active only one toggler from group
    initGroup(type = this.opt.attrGroup) {
      this.items(type).forEach(toggler => {
        toggler.addEventListener(`${this.opt.eventNamespace}.button.on`, () => {
          const names = [];
          this.items(type, toggler.getAttribute(type)).forEach(item => {
            const name = item.getAttribute(this.opt.attrTarget);

            if (item !== toggler && !names.includes(name) && this.isClassed(item)) {
              names.push(name);
              this.switch(name);
            }
          });
        });
      });
    },

    // Keep active only one toggler from tabs
    initTabs() {
      this.initGroup(this.opt.attrTabs);
    }

  }; // Assign classToggler to global variable

  window.classToggler = classToggler;
})();