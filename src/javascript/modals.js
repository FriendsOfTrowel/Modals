export default class TrowelModals {
  constructor(elements) {
    elements.forEach(function(element, index) {
      let element_obj = new TrowelModal(element);
    })
  }
}

class TrowelModal {
  constructor(element) {
    this.element = element;
    this.dialog = this.element.children[0];
    this.rootNodes = [this.element, this.dialog];

    this.hideTriggers = [].slice.call(this.element.querySelectorAll('[data-modal="hide"]'));
    this.showTriggers = [].slice.call(document.querySelectorAll(`[data-modal="open"][data-target="#${this.element.id}"]`));

    this.events = this.events();
    this.listener();
    this.element.dispatchEvent(this.events.mounted);
    return;
  }

  isVisible() {
    return this.element.getAttribute('data-modal') === 'visible';
  }

  show() {
    this.element.dispatchEvent(this.events.show);
    this.rootNodes.map(node => node.setAttribute('data-modal', 'visible'));
    this.element.dispatchEvent(this.events.shown);
    return;
  }

  hide() {
    this.element.dispatchEvent(this.events.hide);
    this.rootNodes.map(node => node.setAttribute('data-modal', 'invisible'));
    this.element.dispatchEvent(this.events.hidden);
    return;
  }

  toggle() {
    this.element.dispatchEvent(this.events.toggle);
    this.isVisible() ? this.hide() : this.show();
    this.element.dispatchEvent(this.events.toggled);
    return;
  }

  backdropClose(event) {
    // make sure the click event is on the modal and not dom children element
    if (event.currentTarget === event.target) this.hide();

    return;
  }

  events() {
    const show = new Event('trowel.modal.show');
    const shown = new Event('trowel.modal.shown');
    const hide = new Event('trowel.modal.hide');
    const hidden = new Event('trowel.modal.hidden');
    const toggle = new Event('trowel.modal.toggle');
    const toggled = new Event('trowel.modal.toggled');
    const mounted = new Event('trowel.modal.mounted');

    return { show, shown, hide, hidden, toggle, toggled, mounted };
  }

  listener() {
    this.element.addEventListener('click', this.backdropClose.bind(this));
    this.hideTriggers.map(hideTrigger => hideTrigger.addEventListener('click', this.backdropClose.bind(this)))
    this.showTriggers.map(showTrigger => showTrigger.addEventListener('click', this.show.bind(this)))

    return;
  }
}
