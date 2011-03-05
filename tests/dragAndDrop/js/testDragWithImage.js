
var test1 = new function () {
	var me = this;
	var dragNode, dropNode;
	
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		dragNode = document.getElementById('toDrag');
		dropNode = document.getElementById('toDrop');
		
		EventHelpers.addEvent(dragNode, 'dragstart', dragStartEvent);
		//EventHelpers.addEvent(dragNode, 'mousedown', selectTextEvent);
		
		EventHelpers.addEvent(dropNode, 'dragover', cancel);
		EventHelpers.addEvent(dropNode, 'dragenter', cancel); 
		EventHelpers.addEvent(dropNode, 'drop', dropEvent);
		
		//EventHelpers.addEvent(dragNode, 'drag', dragStartEvent)
		
		jslog.debug('inited')
	}
	
	
	
	function dragStartEvent(e) {
		var node = EventHelpers.getEventTarget(e);
		e.dataTransfer.setData('Text', node.id);
		var dragIcon = document.createElement('img');
		dragIcon.src = 'http://localhost/shared/images/en/back.png';
		e.dataTransfer.setDragImage(dragIcon, -10, -10);

	}
	
	function dropEvent(e) {
		jslog.debug('dropEventStarted')
		EventHelpers.preventDefault(e);
		
		dropNode.innerHTML += "<p>"+ e.dataTransfer.getData('Text') + '</p>';
		return false;
	}
	
	function cancel (e) {
		jslog.debug('cancel started')
		EventHelpers.preventDefault(e);
	}
}

// fixes visual cues in IE and Chrome 3.0 and lower.
DragDropHelpers.fixVisualCues=true;


EventHelpers.addPageLoadEvent('test1.init');
