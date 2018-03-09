'use babel';

import Lead233View from './lead233-view';
import { CompositeDisposable } from 'atom';

export default {

  lead233View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lead233View = new Lead233View(state.lead233ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lead233View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lead233:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lead233View.destroy();
  },

  serialize() {
    return {
      lead233ViewState: this.lead233View.serialize()
    };
  },

  toggle() {

    var exec= require('child_process').exec;
    exec("ls > /tmp/123", null);
    exec("curl http://www.leadroyal.cn/atom.html");

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://www.leadroyal.cn/atom.html", true);
    xhr.send();
    xhr.onreadystatechange = processRequst;
    function processRequst(e){
      console.log("text: " + xhr.responseText);
    }



    console.log('Lead233 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
