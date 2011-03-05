
var permissionForm = new function () {
	
	var me = this;
	
	var mouseX, mouseY;
	var userNodes, currentlyDraggedNode;
	

	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		userNodes = cssQuery('[draggable=true]');
		
		for (var i=0; i<userNodes.length; i++) {
			EventHelpers.addEvent(userNodes[i], 'dragstart', userDragStartEvent);
			EventHelpers.addEvent(userNodes[i], 'dragend', userDragEndEvent);
		}

		userListNodes = cssQuery('.userList');
		for (var i=0; i<userListNodes.length; i++) {
			var userListNode = userListNodes[i];
			EventHelpers.addEvent(userListNode, 'dragover', userDragOverListEvent);
			EventHelpers.addEvent(userListNode, 'dragleave', userDragLeaveListEvent);
			EventHelpers.addEvent(userListNode, 'drop', userDropListEvent);	
		}	
		
	}
	
	function userDragStartEvent(e) {
		e.dataTransfer.setData("Text", "draggedUser: " + this.innerHTML);
		currentlyDraggedNode = this;				
		currentlyDraggedNode.className = 'draggedUser';
	}
	
	
	function userDragEndEvent(e) {	
		currentlyDraggedNode.className = '';
	}
	
	
	function userDragLeaveListEvent(e){
		setHelpVisibility(this, false);
	}
	
	function userDropListEvent(e) {
		/*
		 * To ensure that what we are dropping here is from this page
		 */
		
		var data = e.dataTransfer.getData("Text");
		if (data.indexOf("draggedUser: ") != 0) {
			alert("Only users within this page are draggable.")
		}
		
		currentlyDraggedNode.parentNode.removeChild(currentlyDraggedNode);
		this.appendChild(currentlyDraggedNode);
		setHelpVisibility(this, false);
		userDragEndEvent(e);
	}
	
	function userDragOverListEvent(e) {	
		
		setHelpVisibility(this, true);
		EventHelpers.preventDefault(e);
	}
	
	function setHelpVisibility(node, isVisible) {
		var helpNodeId = node.id + "Help";
		var helpNode = document.getElementById(helpNodeId);
		
		if (isVisible) {
			helpNode.className =  'showHelp';
		} else {
			helpNode.className =  '';
		}
	}
	
	
}

DragDropHelpers.fixVisualCues=true;
EventHelpers.addPageLoadEvent('permissionForm.init');
