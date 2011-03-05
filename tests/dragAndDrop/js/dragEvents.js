
var dragEvents = new function () {
	
	var me = this;
	
	var dragNode, dropNode, eventFieldsNode, propertiesFieldsNode, dragEffectsFieldsNode;
	
	
	var checkboxIds = ["node", "event", "event.dataTransfer", 
		"event.dataTransfer.getData('Text')", "event.dataTransfer.getData('Image')"];
	
	var dropEffects = ["copy", "move", "link", "none"];
	var effectsAllowed = ["copy", "link", "move", "copyLink", "copyMove", "linkMove", "all", "none"];		
	
	var dragEventNames = ["dragstart", "drag", "dragend"];
	var dropEventNames = ["dragenter", "dragover", "dragleave", "drop"];
	var otherProperties = ["effectAllowed", "dragEffect"];
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		dragNode = document.getElementById('toDrag');
		dropNode = document.getElementById('toDrop');
		eventFieldsNode = document.getElementById('eventFields');
		propertiesFieldsNode = document.getElementById('propertiesFields');
		dropEffectsNode = document.getElementById('dropEffectsField');
		effectAllowedFieldNode = document.getElementById('effectAllowedField');
		
		
		
		for (var i=0; i<dragEventNames.length; i++) {
			EventHelpers.addEvent(dragNode, dragEventNames[i], dragDropEvent);
			eventFieldsNode.innerHTML += sprintf(
				'<input type="checkbox" name="%s" id="%s" /><label for="%s">%s</label><br />', 
				dragEventNames[i], dragEventNames[i],  dragEventNames[i],dragEventNames[i]
			);
		}
		
		for (var i=0; i<dropEventNames.length; i++) {
			EventHelpers.addEvent(dropNode, dropEventNames[i], dragDropEvent);
			eventFieldsNode.innerHTML += sprintf(
				'<input type="checkbox" id="%s" name="%s" /><label for="%s">%s</label><br />', 
				dropEventNames[i], dropEventNames[i], dropEventNames[i], dropEventNames[i]  
			);
		}
		
		for (var i=0; i<checkboxIds.length; i++) {
			propertiesFieldsNode.innerHTML += sprintf(
				'<input type="checkbox" id="%s" name="%s" /><label for="%s">%s</label><br />', 
				checkboxIds[i], checkboxIds[i], checkboxIds[i], checkboxIds[i]  
			)
		}
		
		/*
		var selectHTML = '<select name="dropEffect" id="dropEffect">';
		for (var i = 0; i < dropEffects.length; i++) {
			selectHTML += sprintf('<option value="%s">%s</option>',
				dropEffects[i], dropEffects[i]);
		}
		selectHTML += "</select>"
		*/
		
		dropEffectsNode.innerHTML = getSelectHTML("dropEffect", dropEffects);
		
		effectAllowedFieldNode.innerHTML = getSelectHTML("effectAllowed", effectsAllowed);
		
		
			
	}
	
	
	
	
	
	function dragDropEvent(event) {
		var node = EventHelpers.getEventTarget(event);
		
		if (node.id == "toDrag") {
			event.dataTransfer.effectAllowed = document.getElementById('effectAllowed').value;
		} 

		if (node.id == "toDrop") {
			event.dataTransfer.dropEffect = document.getElementById('dropEffect').value;
		}	
		
		//var properties = [node, e, e.dataTransfer, e.dataTransfer.getData()];
		if (document.getElementById(event.type).checked) {
			jslog.debug("----------------");
			
			
				
			
		
			var coords = DragDropHelpers.getEventCoords(event);
			
			
			jslog.debug(sprintf("Event type: %s, From Node: %s", event.type, node.id));
			
			jslog.debug(sprintf("effectAllowed: %s, dropEffect: %s", 
				event.dataTransfer.dropEffect,
				event.dataTransfer.effectAllowed));
			
			//jslog.debug(DebugHelpers.getProperties(coords))
			if (coords) {
				jslog.debug(sprintf("Coords: (%d, %d) of node type %s", coords.x, coords.y, XMLHelpers.getOuterXML(node)));
			}
			else {
				jslog.debug("no coordinates set")
			}
			
			for (var i=0; i<checkboxIds.length; i++) {
				if (document.getElementById(checkboxIds[i]).checked) {
					
					try {
						jslog.debug(sprintf("%s: %s", 
							checkboxIds[i], 
							DebugHelpers.getProperties(eval(checkboxIds[i]), checkboxIds[i])));
					} catch(ex) {
						jslog.debug(sprintf("property '%s' = %s",
							checkboxIds[i],
							eval(checkboxIds[i])
						))
					}
				}
			}
			
		}
		
		if (event.type == 'dragover' || event.type== 'drop') {
			EventHelpers.preventDefault(event);
		}
	}
	
	function getSelectHTML (selectNodeName, propertiesArray) {
		var selectHTML = sprintf(
			'<select name="%s" id="%s">', selectNodeName, selectNodeName);
		for (var i = 0; i < propertiesArray.length; i++) {
			selectHTML += sprintf('<option value="%s">%s</option>',
				propertiesArray[i], propertiesArray[i]);
		}
		selectHTML += "</select>"

		return selectHTML;
		
	}
	
	
	function isMember(scalar, array) {
		
		for (var i=0; i<array.length; i++) {
			if (scalar == array[i]) {
				return true;
			}
		}
		return false;
	}
	
}

// fixes visual cues in IE and Chrome 3.0 and lower.
DragDropHelpers.fixVisualCues=true;

EventHelpers.addPageLoadEvent('dragEvents.init');
