/*!
 * jquery.dad.js v2 (http://konsolestudio.com/dad)
 * Author William Lima
 */

export default class rsDnD{
    constructor(elem) {
        this.dragSrcEl = null;
        this.draggables = elem;
        //Set listeners
        [].forEach.call(this.draggables, (elem)=> {
            elem.addEventListener("dragstart", (e)=>{this.dragStart(e,elem)}, false);
            elem.addEventListener("drag", (e)=>{this.drag(e,elem)}, false);
            elem.addEventListener("dragenter", (e)=>{this.dragEnter(e,elem)}, false);
            elem.addEventListener("dragover",(e)=>{this.dragOver(e,elem)} , false);
            elem.addEventListener("dragleave", (e)=>{this.dragLeave(e,elem)}, false);
            elem.addEventListener("drop", (e)=>{this.drop(e,elem)}, false);
            elem.addEventListener("dragend", (e)=>{this.dragEnd(e,elem)}, false);
        });
    }

    dragStart(e,elem) {
        console.log('drag started');
        e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', elem.innerHTML);
        e.dataTransfer.setData('text', elem.innerHTML);
        this.dragSrcEl=elem;
        // this.className = this.className.replace("target", "");
    }

    drag(e) {
        /* console.log('drag event') */;
        this.className += ' moving';
    }

    dragOver(e,elem) {
        /* console.log('drag over') */;
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';
        elem.className += " over";
    }

    dragEnter(e,elem) {
        console.log('drag enter');

        elem.className += " over";
    }

    dragLeave(e,elem) {
       elem.className = "";
    }

    drop(e,elem) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        // let dragSrc = this.dragSrcEl;
        if (this.dragSrcEl !== elem) {
            console.log(e.target);
            // console.log("dragged-id:",this.dragSrcEl.getAttribute('data-id'));
            // console.log("draggd-seq:",this.dragSrcEl.getAttribute('data-seq'));
            //
            //
            // console.log("dropped-id:",elem.getAttribute('data-id'));
            // console.log("dropped-seq:",elem.getAttribute('data-seq'));


            this.dragSrcEl.innerHTML = elem.innerHTML;
            // this.innerHTML = e.dataTransfer.getData('text/html');
            elem.innerHTML = e.dataTransfer.getData('text');
            let event=new CustomEvent("rsDnd.dragEnd",{
                detail:{
                    dragged_id:this.dragSrcEl.getAttribute('data-id'),
                    dragged_seq:this.dragSrcEl.getAttribute('data-seq'),
                    dropped_id:elem.getAttribute('data-id'),
                    dropped_seq:elem.getAttribute('data-seq')
                }
            });
            elem.dispatchEvent(event);
        }

        return false;
    }

    dragEnd(e,elem) {
        [].forEach.call(this.draggables, function(elem) {
            elem.className = "";
        });
    }

}
