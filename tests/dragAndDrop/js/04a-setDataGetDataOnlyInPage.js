
var dragObject = new function () {
	var me = this;
	
	var targetNode; 
	var eventNoticeNode, dragEventNoticeNode;
	
	var dataTransferCommentString;
	
	me.init = function () {
	
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}	
		
		
		targetNode=document.getElementById('dropTarget');
		eventNoticeNode = document.getElementById('eventNotice');
		dragEventNoticeNode = document.getElementById('dragEventNotice');
		
		/* These are events for the draggable objects */
		var dragNodes = cssQuery('[draggable=true]');
		for (var i = 0; i < dragNodes.length; i++) {
			var  dragNode=dragNodes[i]
			EventHelpers.addEvent(dragNode, 'dragstart', dragStartEvent);
		}
		
		/* These are events for the object to be dropped */
		EventHelpers.addEvent(targetNode, 'dragover', dragOverEvent);
		EventHelpers.addEvent(targetNode, 'drop', dropEvent);
	}
	
	

	
	function dragStartEvent(e) {
		dataTransferCommentString = DragDropHelpers.randomString();
		
		e.dataTransfer.setData('Text',
			sprintf('<img src="%s" alt="%s" /><br /><p class="caption">%s</p><!-- %s -->',
				this.src, this.alt, this.alt, dataTransferCommentString
			)
		);
	}
	
	function dragOverEvent(e) {
		EventHelpers.preventDefault(e);
	}
	
	
	function dropEvent(e) {
		var data = e.dataTransfer.getData('Text');
		
		var dataComment = 
		    sprintf("<!-- %s -->", dataTransferCommentString);
		
		if (data.indexOf(dataComment) > 0) {
			this.innerHTML = e.dataTransfer.getData('Text');
		} else {
			alert("Only images on this page are allowed to be dropped here.")
		}
		EventHelpers.preventDefault(e);
		
	}
	
	
}

// fixes visual cues in IE and Chrome 3.0 and lower.
DragDropHelpers.fixVisualCues=true;

EventHelpers.addPageLoadEvent('dragObject.init');
