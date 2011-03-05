
var dragObject = new function () {
	var me = this;
	
	var dragNode;
	var eventNoticeNode, dragEventNoticeNode;
	
	/* runs when the page is loaded */
	me.init = function () {
	
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}	
		
		/* The node being dragged */
		dragNode=document.getElementById('toDrag');
		
		/* The nodes that report to the user what is happening to that node*/
		eventNoticeNode = document.getElementById('eventNotice');
		dragEventNoticeNode = document.getElementById('dragEventNotice');
		
		/* The drag event handlers */
		EventHelpers.addEvent(dragNode, 'dragstart', dragStartEvent);
		EventHelpers.addEvent(dragNode, 'drag', dragEvent); 
		EventHelpers.addEvent(dragNode, 'dragend', dragEndEvent); 
	}
	
	/* 
	 * The dragstart event handler logs to the user when the event started.
	 */
	function dragStartEvent(e) {
		eventNoticeNode.innerHTML = 
			sprintf("<strong>%s</strong>: Drag Event started.<br />%s", 
				new Date(),  eventNoticeNode.innerHTML);
	}
	
	/*
	 * The drag event reports to the user that dragging is on. 
	 */
	
	function dragEvent(e) {
		dragEventNoticeNode.innerHTML = "Currently dragging. ";
	}
	
	/*
	 * The dragend event logs to the user when the event had finished *and*
	 * also reports that dragging has now stopped.
	 */
	function dragEndEvent(e) {
		eventNoticeNode.innerHTML = 
			sprintf("<strong>%s</strong>: Drag Event stopped.<br />%s", 
				new Date(), eventNoticeNode.innerHTML);
				
		dragEventNoticeNode.innerHTML = "Dragging stopped."
	}

}

// fixes visual cues in IE and Chrome.
DragDropHelpers.fixVisualCues=true;

EventHelpers.addPageLoadEvent('dragObject.init');
