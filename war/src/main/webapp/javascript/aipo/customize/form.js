/*
 * Aipo is a groupware program developed by Aimluck,Inc.
 * Copyright (C) 2004-2011 Aimluck,Inc.
 * http://www.aipo.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

dojo.provide("aipo.customize.form");

aipo.customize.positionInitialize=function(){
	dojo.query(".body-child").forEach(function(item){
		dojo.place(item,dojo.query("body")[0],"last");
	});
};

aipo.customize.onReceiveMessage = function(msg){
    if(!msg) {
        var arrDialog = dijit.byId("modalDialog");
        if(!!arrDialog){
            arrDialog.hide();
        }
    }
    if (dojo.byId('messageDiv')) {
        dojo.byId('messageDiv').innerHTML = msg;
    }
}

aipo.customize.showMenu = function(portlet_id) {
	var menuNode = dojo.query('#menubar_' + portlet_id);
	var buttonNode= dojo.query('#menubar_button_' + portlet_id);
	if(menuNode.length==0 || buttonNode.length==0)return;//error

	var rect=buttonNode[0].getBoundingClientRect();
	var html=document.documentElement.getBoundingClientRect();
	if (menuNode.style('display') == 'none') {
		dojo.query('div.menubar').style('display', 'none');
		 var scroll={
        	left:document.documentElement.scrollLeft||document.body.scrollLeft,
        	top:document.documentElement.scrollTop||document.body.scrollTop
        };
		menuNode.style("opacity","0");
		menuNode.style("display","block");
        menuNode.style("position","absolute");

		if(html.right-menuNode[0].clientWidth>rect.left){
			menuNode.style("left",rect.left+scroll.left+"px");
        }else{
        	menuNode.style("left",rect.right-menuNode[0].clientWidth+scroll.left+"px");
        }
         if(html.bottom-menuNode[0].clientHeight>rect.bottom){
        	 menuNode.style("top",rect.bottom+scroll.top+"px");
        }else{
        	menuNode.style("top",rect.top-menuNode[0].clientHeight+scroll.top+"px");
        }
        menuNode.style("opacity","1");

        if(dojo.byId("timeline_"+portlet_id) && (dojo.query('div.timeline').length == 1)){
    		dojo.query('#accessControlDelete_'+portlet_id).style('display', 'none');
    	}
    } else {
        aipo.customize.hideMenu(portlet_id);
    }
}

aipo.customize.showMenuForTab = function(tab_id) {
	var menuNode = dojo.query('#menubar_' + tab_id);
	var buttonNode= dojo.query('#menubar_button_' + tab_id);
	if(menuNode.length==0 || buttonNode.length==0)return;//error

	var rect=buttonNode[0].getBoundingClientRect();
	var html=document.documentElement.getBoundingClientRect();
	if (menuNode.style('display') == 'none') {
		dojo.query('div.menubar').style('display', 'none');
		 var scroll={
        	left:document.documentElement.scrollLeft||document.body.scrollLeft,
        	top:document.documentElement.scrollTop||document.body.scrollTop
        };
		menuNode.style("opacity","0");
		menuNode.style("display","block");
        menuNode.style("position","absolute");

		if(html.right-menuNode[0].clientWidth>rect.left){
			menuNode.style("left",rect.left+scroll.left+"px");
        }else{
        	menuNode.style("left",rect.right-menuNode[0].clientWidth+scroll.left+"px");
        }
       	 menuNode.style("top",rect.bottom+scroll.top+"px");
        menuNode.style("opacity","1");
    } else {
        aipo.customize.hideMenu(tab_id);
    }
}

aipo.customize.showMenuButtonOnly = function(portlet_id) {
	var menuNode = dojo.query('#menubar_' + portlet_id);
	if (menuNode.style('display') == 'none') {
		menuNode.style("display","block");
        menuNode.style("opacity","1");
    } else {
		menuNode.style("display","none");
        menuNode.style("opacity","0");
    }
}

aipo.customize.showMenuSchedule = function(portlet_id) {
	var menuNode = dojo.query('#menubar_' + portlet_id + '_date');
	if (menuNode.style('display') == 'none') {
        dojo.query('div.menubar').style('display', 'none');
        menuNode.style('display', 'block');
        if(dojo.byId("timeline_"+portlet_id) && (dojo.query('div.timeline').length == 1)){
    		dojo.query('#accessControlDelete_'+portlet_id).style('display', 'none');
    	}
        var html = dojo.byId("indicateDate_" + portlet_id);
        if(dojo.isIE){
        	var getLeft = function(oj){
        	    var px = 0;
        	    while(oj){
        	        px += oj.offsetLeft;
        	        oj = oj.offsetParent;
        	    }
        	    return px;
        	}
        	var getTop = function(oj){
        	    var px = 0;
        	    while(oj){
        	        px += oj.offsetTop;
        	        oj = oj.offsetParent;
        	    }
        	    return px;
        	}
        	var left = getLeft(html) - getLeft(html.offsetParent.offsetParent);
        	var top = getTop(html) - getTop(html.offsetParent.offsetParent);
        } else {
        	var left = html.offsetLeft - html.clientLeft;
        	var top = html.offsetTop - html.clientTop;
        }
        menuNode.style('left', left + "px");
        menuNode.style('top', top + 24 + "px");
    } else {
        aipo.customize.hideMenu(portlet_id);
    }
}

aipo.customize.hideMenu = function(portlet_id) {
    var menuNode = dojo.query('div.menubar').style('display', 'none');
//    if (menuNode.style('display') == 'block') {
//        menuNode.style('display', 'none');
//    }
}

aipo.customize.setController = function(portlet_id, sender) {
    var controller = sender.parentNode.id;
    dojo.query('form#form' + portlet_id + ' input[name="controller"]')[0].value = controller;

    var tds = dojo.query('form#form' + portlet_id + ' table.controllerTable td');
    var length = tds.length;
    for (var i = 0 ; i < length ; i++) {
    	dojo.removeClass(tds[i], 'selected');
    }

    var td = dojo.query('form#form' + portlet_id + ' td#' + controller)[0];
    dojo.addClass(td, "selected");
}

aipo.customize.deletesubmit = function(url, portlet_id, callback) {
	if (confirm(ALLocalizationUtils.getl10nFormat("CUSTOMIZE_APPLICATION_DELETE_CAUTION")) {
        aipo.customize.submit(url, portlet_id, callback);
    }
}

aipo.customize.deleteTabSubmit = function(url, portlet_id, callback) {
	if (confirm(ALLocalizationUtils.getl10nFormat("CUSTOMIZE_APPLICATION_DELETE_CAUTION")) {
        aipo.customize.submit(url, portlet_id, callback);
    }
}

aipo.customize.submit = function(url, portlet_id, callback) {
    try{
        dojo.xhrPost({
            url: url,
            timeout: 30000,
            content: {portlet_id: portlet_id},
            encoding: "utf-8",
            handleAs: "json-comment-filtered",
            headers: { X_REQUESTED_WITH: "XMLHttpRequest" },
            load: function (response, ioArgs){
                var html = "";
                if(dojo.isArray(response) && response.length > 0) {
                    if(response[0] == "PermissionError"){
                        html += "<ul>";
                        html += "<li><span class='caution'>" + response[1] + "</span></li>";
                        html += "</ul>";
                    }else{
                        html += "<ul>";
                        dojo.forEach(response, function(msg) {
                            html += "<li><span class='caution'>" + msg + "</span></li>";
                        });
                        html += "</ul>";
                    }
                }
                callback.call(callback, html);
                if (html != "") {
                    aimluck.io.disableForm(form, false);
                }
            },
            error: function (error) {
            }
        });
    } catch(E) {
    };
}

aipo.customize.addAutoHideMenuTrigger = function(){
	dojo.query('.customizeMenuIcon,.menubarOpenButton').forEach(function(element) {
        dojo.connect(element, 'onmouseenter', null, function(){
            dojo.addClass(this, 'customizeMenuIconMouseenter');
        });
        dojo.connect(element, 'onmouseleave', null, function(){
            dojo.removeClass(this, 'customizeMenuIconMouseenter');
        });
    });

    var handle = dojo.connect(dojo.query('body')[0], 'onclick', null, function(){
        if (dojo.query('.customizeMenuIconMouseenter').length == 0) {
            aipo.customize.hideMenu();
        }
    });
}

