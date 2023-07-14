class ListBox {
  constructor(listbox) {
    this._listbox = listbox;
    this._listboxButton = this._listbox.querySelector('.listbox__btn');
    this._listboxItems = this._listbox.querySelectorAll('.listbox__item');
    this._currentItem = this._listbox.querySelector('[aria-selected="true"]');
    this._isOpen = false;
    
    this._init();
  }

  _init() {
    this._listboxButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._toggleListBox();
    });

    this._listboxItems.forEach(item => {
      item.addEventListener('click', () => {
        this._currentItem.setAttribute('aria-selected', 'false');
        this._currentItem = item;
        this._currentItem.setAttribute('aria-selected', 'true');
        this._listboxButton.querySelector('.listbox__label').textContent =  this._currentItem.textContent;
        this._listbox.classList.remove('show');
      });
    });

    document.addEventListener('click', (event) => {
      if (this._isOpen && !this._listbox.contains(event.target)) {
        this._closeListBox();
      }
    });
  }

  getSelectedOption() {
    return this._currentItem.dataset.sortBy;
  }

  get options() {
    return this._listboxItems;
  }

  _toggleListBox() {
    this._isOpen ? this._closeListBox() : this._openListBox();
  }

  _openListBox() {
    this._isOpen = true;
    this._listbox.classList.add('show');
    this._listboxButton.classList.remove('btn--hover')
  }

  _closeListBox() {
    this._isOpen = false;
    this._listbox.classList.remove('show');
    this._listboxButton.classList.add('btn--hover')
  }
}