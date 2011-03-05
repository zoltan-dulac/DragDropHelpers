
var dragObject = new function () {
	var me = this;
	
	var dragNode, targetNode; 
	var eventNoticeNode, dragEventNoticeNode;
	me.init = function () {
	
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}	
		
		dragNode=document.getElementById('toDrag');
		targetNode=document.getElementById('dropTarget');
		eventNoticeNode = document.getElementById('eventNotice');
		dragEventNoticeNode = document.getElementById('dragEventNotice');
		
		/* These are events for the draggable object */
		EventHelpers.addEvent(dragNode, 'dragstart', dragStartEvent);
		EventHelpers.addEvent(dragNode, 'drag', dragEvent); 
		EventHelpers.addEvent(dragNode, 'dragend', dragEndEvent);
		
		/* These are events for the object to be dropped */
		EventHelpers.addEvent(targetNode, 'dragover', dragOverEvent);
		EventHelpers.addEvent(targetNode, 'drop', dropEvent);
		EventHelpers.addEvent(targetNode, 'dragenter', dragEnterEvent);
		EventHelpers.addEvent(targetNode, 'dragleave', dragLeaveEvent);
	}
	
	function dragStartEvent(e) {
		showMessage("Drag Event started");
	}
	
	function dragEvent(e) {
		dragEventNoticeNode.innerHTML = "Currently dragging.";
	}
	
	function dragEndEvent(e) {
		showMessage("Drag Event stopped");			
		dragEventNoticeNode.innerHTML = "Dragging stopped.";
	}
	
	
	function dragOverEvent(e) {
		var coords = DragDropHelpers.getEventCoords(e);

		showMessage(sprintf( 
		   "Drag over event happened on node with id %s at coordinate (%d, %d)",
		   this.id, coords.x, coords.y));
		   
		EventHelpers.preventDefault(e);
	}
	
	
	function dropEvent(e) {
		showMessage("Drop event happened on node with id " + this.id);
		EventHelpers.preventDefault(e);
		
	}
	
	
	function dragEnterEvent(e) {
		showMessage("Drag Enter event happened on node with id " + this.id);
	}
	
	function dragLeaveEvent(e) {
		showMessage("Drag Leave event happened on node with id " + this.id);
	}
	
	
	function showMessage(message) {
		eventNoticeNode.innerHTML = 
			sprintf("<strong>%s</strong>: %s<br />%s", 
				new Date(), message, eventNoticeNode.innerHTML);
	}
	
}

// fixes visual cues in IE and Chrome 3.0 and lower.
DragDropHelpers.fixVisualCues=true;

EventHelpers.addPageLoadEvent('dragObject.init');
