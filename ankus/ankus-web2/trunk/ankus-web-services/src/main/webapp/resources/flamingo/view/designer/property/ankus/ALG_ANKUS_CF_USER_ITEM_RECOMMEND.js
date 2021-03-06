/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Ankus : Collaborative Filtering User based Recommendation
 *
 * @cli hadoop jar ankus-core.jar ItemBasedRecommendation -input <IN> -similarDataInput <IN> -output <HDFS_OUTPUT_FILE> -delimiter '\t'
 * @extends Flamingo.view.designer.property._NODE_ALG
 * @author <a href="mailto:fharenheit@gmail.com">Byoung Gon, Kim</a>
 * @author <a href="mailto:myeongha.kim@cloudine.co.kr">Myeong Ha, Kim</a>
 * @see <a href="http://www.openankus.org/display/DOC/Flamingo+Hadoop+Manager+Integration">Ankus Algorithm</a>
 */
Ext.ns('Flamingo.view.designer.property.ankus');
Ext.define('Flamingo.view.designer.property.ankus.ALG_ANKUS_CF_USER_ITEM_RECOMMEND', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_ANKUS_CF_USER_ITEM_RECOMMEND',

    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._DependencyGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid',
        'Flamingo.view.designer.property._EnvironmentGrid'
    ],

    width: 520,
    height: 580,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PARAMETER,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 90
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                // Ankus MapReduce가 동작하는데 필요한 입력 경로를 지정한다.  이 경로는 N개 지정가능하다.
                 //layout 변경 start
                 {
                  xtype: 'fieldset',
                  height: 190,
                  title: 'File Path',
                  layout: 'anchor',
                  defaults: {
                      anchor: '100%',
                      labelWidth: 200,
                      hideEmptyLabel: false
                  }, 
                  items:[                
			                {
			                    xtype: '_inputGrid',
			                    title: MSG.DESIGNER_TITLE_INPUT_PATH,
			                    height: 115
			                },			               
	                        {
			            	    forceFit: true,
			            	    columnLines: true,                	    
			            	    title: MSG.DESIGNER_TITLE_OUTPUT_PATH,            	    
			            	    defaults: {
			                        hideLabel: true                      
			                    //    margin: "2 0 0 0"  // Same as CSS ordering (top, right, bottom, left)
			                    },
			                    layout: 'hbox',
			                    items: [
			                        {
			                            xtype: '_browserField',
			                            name: 'output',
			                            allowBlank: false,
			                            readOnly: false,
			                            flex: 1
			                        }
			                    ]
	                        }
			                ]
                 },
                 {
                     xtype: 'fieldset',
                     height: 630,
                     title: 'Parameter Option',
                     layout: 'anchor',
                     defaults: {
                         anchor: '100%',
                         labelWidth: 200,
                         hideEmptyLabel: false
                   }, 
                  items:[      
                /*
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG.DESIGNER_RECOMMEND_STANDARD,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            name: 'basedType',
                            value: 'user',
                            flex: 1,
                            tooltip: MSG.DESIGNER_MSG_RECOMMEND_STANDARD,
                            forceSelection: true,
                            multiSelect: false,
                            disabled: false,
                            editable: false,
                            displayField: 'name',
                            valueField: 'value',
                            mode: 'local',
                            queryMode: 'local',
                            triggerAction: 'all',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: 'USER', value: 'user', description: MSG.DESIGNER_RECOMMEND_USER_BASED}
                                ]
                            })
                        }
                    ]
                },
                */
                	{
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG.DESIGNER_COL_DELIMITER,
                    tooltip: MSG.DESIGNER_MSG_COL_DELIMITER,
                    layout: 'hbox',
                    items: [
                    	{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                        	{
                            xtype: 'combo',
                            name: 'delimiter',
                            value: '\\t',
                            flex: 1,
                            forceSelection: true,
                            multiSelect: false,
                            editable: false,
                            readOnly: this.readOnly,
                            displayField: 'name',
                            valueField: 'value',
                            mode: 'local',
                            queryMode: 'local',
                            triggerAction: 'all',
                            tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                            store: Ext.create('Ext.data.Store', {
                            	fields: ['name', 'value', 'description'],
                                data: [
                                	{name: MSG.COMMON_DOUBLE_COLON, value: '::', description: '::'},
                                    {name: MSG.COMMON_COMMA, value: ',', description: ','},
                                    {name: MSG.COMMON_TAB, value: '\\t', description: '\\t'},
                                    {name: MSG.COMMON_BLANK, value: '\\s', description: '\\s'},
                                    {name: MSG.COMMON_USER_DEFINED, value: 'CUSTOM', description: MSG.COMMON_USER_DEFINED}
                                ]
                            }),
                            listeners: {
                            	change: function (combo, newValue, oldValue, eOpts) {
                                	// 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
                                    var customValueField = combo.nextSibling('textfield');
                                    if (newValue === 'CUSTOM') {
                                    	customValueField.enable();
                                        customValueField.isValid();
                                    } else {
                                    	if(customValueField!=null){
                                    		customValueField.disable();
                                            if (newValue) {
                                                customValueField.setValue(newValue);
                                            } else {
                                                customValueField.setValue('::');
                                            }                                            		
                                    	}else{
                                    		customValueField = '\\t';
                                    	}
                                    }
                                 }
                             }
                             },
                             {
                              xtype: 'textfield',
                              name: 'delimiterValue',
                              id: 'delimiterValue',
                              vtype: 'exceptcommaspace',
                              flex: 1,
                              disabled: true,
                              readOnly: this.readOnly,
                              allowBlank: false,
                              value: '\\t'
                              }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'Preview file from HDFS',
//                    iconCls: 'common-confirm',
                    handler: function (grid, rowIndex, colIndex) {

                        // Parameter this form
                        var canvas = Ext.ComponentQuery.query('form')[1];
                        var form = canvas.getForm();

                        // Preview grid
                        var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];

                        // Input paths grid
                        var inputGrid = Ext.ComponentQuery.query('_inputGrid')[0];
                        var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();

                        if (selectedInputPath[0] === undefined) {
                            msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
                            return;
                        }

                        var inputPath = selectedInputPath[0].data.input;
                        //var delimiter = form.getValues()['delimiter'];
                        var delimiter = Ext.getCmp('delimiterValue').getValue();
                        
                        if(delimiter == undefined){
                        	delimiter = '::';
                        }

                        // Get _inputGrid values
                        var inputGridCanvas = Ext.ComponentQuery.query('canvas')[0];
                        var inputGridForm = inputGridCanvas.getForm();
                        var engineId = inputGridForm.getValues()['engine_id'];

                        var store = Ext.create('Ext.data.Store', {
                            fields: [
                                {name: 'columnIndex'},
                                {name: 'rowData'}
                            ],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: CONSTANTS.CONTEXT_PATH + CONSTANTS.DESIGNER.LOAD_HDFS_FILE,
                                headers: {
                                    'Accept': 'application/json'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                },
                                extraParams: {
                                    'inputPath': inputPath,
                                    'delimiter': delimiter,
                                    'engineId': engineId
                                }
                            }
                        });

                        // Set grid row to preview file from hdfs
                        var rec;
                        var columnIndexList;
                        var rowDataList;

                        store.on('load', function (store, records) {
                            for (var i = 0; i < records.length; i++) {
                            
                                columnIndexList = records[i].get('columnIndex');
                                rowDataList = records[i].get('rowData');  

                                for (var k = 0; k < columnIndexList.length; k++) {

                                    rec = new Flamingo.model.designer.Preview({
                                        rIndex: columnIndexList[k],
                                        rData: rowDataList[k]
                                    });

                                    store.insert(0, rec);
                                    //Remove get list from ajax
                                    store.remove(records);
                                    previewGrid.store.sort('rIndex', 'ASC');
                                }
                            }
                        });

                        Ext.suspendLayouts();
                        previewGrid.reconfigure(store, [
                            {
                                text: 'Index',
                                dataIndex: 'rIndex',
                                id: 'rIndex',
                                width: 80
                            },
                            {
                                text: 'Value',
                                dataIndex: 'rData',
                                flex: 1
                            },
                            {
                                xtype: 'checkcolumn',
                                width: 55,
                                header: 'User',
                                dataIndex: 'userCheckIndex',                               
                                listeners: {
                                    checkchange: function (column, recordIndex, checked) {
                                        var rowCount = previewGrid.getStore().data.length;
                                        var dataIndex = this.dataIndex;
                                        var record = previewGrid.getStore().getAt(recordIndex);
                                        checked = !record.get(dataIndex);

                                        for (var i = 0; i < rowCount; i++) {
                                            if (i != recordIndex) {
                                                previewGrid.getStore().getAt(i).set(dataIndex, checked=false);
                                            }
                                        }
                                        
                                        var str_item = record.get('itemCheckIndex');
                                        var str_rating = record.get('ratingCheckIndex');	
                                        
                                        if(str_item==true){
                                        	 record.set('itemCheckIndex', checked);	
                                        }else if(str_rating==true){                                       	 	
                                       	 	record.set('ratingCheckIndex', checked);	
                                        }                                    
                                    }
                                }
                            },
                            {
                                xtype: 'checkcolumn',
                                width: 65,
                                header: 'Item',
                                dataIndex: 'itemCheckIndex',
                                listeners: {
                                    checkchange: function (column, recordIndex, checked) {
                                    	var rowCount = previewGrid.getStore().data.length;
                                        var record = previewGrid.getStore().getAt(recordIndex);
                                        var dataIndex = this.dataIndex;
                                        checked = !record.get(dataIndex);
                                       
                                        for (var i = 0; i < rowCount; i++) {
                                            if (i != recordIndex) {
                                                previewGrid.getStore().getAt(i).set(dataIndex, checked=false);
                                            }
                                        }
                                        
                                        var str_user = record.get('userCheckIndex');
                                        var str_rating = record.get('ratingCheckIndex');	
                                        
                                        if(str_user==true){
                                        	 record.set('userCheckIndex', checked);	
                                        }else if(str_rating==true){                                       	 	
                                       	 	record.set('ratingCheckIndex', checked);	
                                        }              
                                    }
                                }
                            },
                            {
                                xtype: 'checkcolumn',
                                width: 65,
                                header: 'Rating',
                                dataIndex: 'ratingCheckIndex',
                                listeners: {
                                    checkchange: function (column, recordIndex, checked) {

                                        var rowCount = previewGrid.getStore().data.length;
                                        var record = previewGrid.getStore().getAt(recordIndex);
                                        var dataIndex = this.dataIndex;
                                        checked = !record.get(dataIndex);

                                        for (var i = 0; i < rowCount; i++) {
                                            if (i != recordIndex) {
                                                previewGrid.getStore().getAt(i).set(dataIndex, checked=false);
                                            }
                                        }
                                        
                                        var str_user = record.get('userCheckIndex');
                                        var str_item = record.get('itemCheckIndex');	
                                        
                                        if(str_user==true){
                                        	 record.set('userCheckIndex', checked);	
                                        }else if(str_item==true){                                       	 	
                                       	 	record.set('itemCheckIndex', checked);	
                                        }                                                                
                                    }
                                }
                            }                          
                            
                        ]);
                        Ext.resumeLayouts(true);
                    }
                },
                {
                    margin: '10 0 0 0',
                    xtype: 'grid',
                    minHeight: 100,
                    height: 130,
                    itemId: 'previewGrid',
                    multiSelect: true,
                    columns: [
                        {
                            text: 'Index',
                            width: 80,
                            dataIndex: 'rIndex',
                            id: 'rIndex'
                        },
                        {
                            text: 'Value',
                            flex: 1,
                            dataIndex: 'rData'
                        },
                        {
                            xtype: 'checkcolumn',
                            width: 55,
                            header: 'User',
                            dataIndex: 'userCheckIndex',
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor'
                            }
                        },
                        {
                            xtype: 'checkcolumn',
                            width: 65,
                            text: 'Item',
                            dataIndex: 'itemCheckIndex'
                        },
                        {
                            xtype: 'checkcolumn',
                            width: 65,
                            text: 'Rating',
                            dataIndex: 'ratingCheckIndex'
                        }
                    ],
                    tbar: [
                        {
                            text: 'Reset',
                            iconCls: 'common-find-clear',
                            scope: this,
                            align: 'right',
                            handler: function (store) {
                                var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
                                var range = previewGrid.store.getRange();

                                for (var i = 0; i < range.length; i++) {
                                    if (range[i] != null) {
                                        var record = previewGrid.getStore().getAt(i);
                                        record.set('UserCheckIndex', false);
                                        record.set('ItemCheckIndex', false);
                                        record.set('ratingCheckIndex', false);
                                    }
                                }
                            }
                        }
                    ],
                    viewConfig: {
                        enableTextSelection: true,
                        emptyText: 'Click a button to show preview data from HDFS',
                        deferEmptyText: false
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'button',
                    text: 'Select field number',
                    iconCls: 'common-confirm',
                    handler: function (grid, rowIndex, colIndex) {
                        var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
                        var r = previewGrid.store.getRange();
                        
                        var userCount = 0;
                        var itemCount = 0;
                        var rateCount = 0;
                        var record;

                        // Count checkbox from grid
                        for (var i = 0; i < r.length; i++) {
                            if (r[i] != null) {
                                record = previewGrid.getStore().getAt(i);
                                
                                if (r[i].data.userCheckIndex) userCount++;
                                if (r[i].data.itemCheckIndex) itemCount++;
                                if (r[i].data.ratingCheckIndex) rateCount++;
                            }
                        }

                        var userIndexList = [];
                        var itemIndexList = [];
                        var rateIndexList = [];

                        // Set checkbox index from gird
                        for (var i = 0; i < r.length; i++) {
                            if (r[i] != null) {
                                record = previewGrid.getStore().getAt(i);

                                // Set user attribute(index) list
                                if (userCount != r.length && userCount != 0) {
                                    if (r[i].data.userCheckIndex) {
                                        userIndexList.push(r[i].data.rIndex);
                                        if (userCount === userCount - 1) {
                                            userIndexList.push(',');
                                        }
                                    }
                                }
                                // Set item attribute(index) list
                                if (itemCount != r.length && itemCount != 0) {
                                    if (r[i].data.itemCheckIndex) {
                                        itemIndexList.push(r[i].data.rIndex);
                                        if (itemCount === itemCount - 1) {
                                            itemIndexList.push(',');
                                        }
                                    }
                                }
                                // Set rating attribute(index) list
                                if (rateCount != r.length && rateCount != 0) {
                                    if (r[i].data.ratingCheckIndex) {
                                        rateIndexList.push(r[i].data.rIndex);
                                        if (rateCount === rateCount - 1) {
                                            rateIndexList.push(',');
                                        }
                                    }
                                }
                            }
                        }

                        // Set textfiled by grid
                        if (userCount == r.length) {
                            Ext.getCmp('userIndexList').setValue('-1');
                        } else if (userCount === 0) {
                            Ext.getCmp('userIndexList').setValue('');
                        } else {
                            Ext.getCmp('userIndexList').setValue(userIndexList);
                        }
                        
                        if (itemCount == r.length) {
                            Ext.getCmp('itemIndexList').setValue('-1');
                        } else if (itemCount === 0) {
                            Ext.getCmp('itemIndexList').setValue('');
                        } else {
                            Ext.getCmp('itemIndexList').setValue(itemIndexList);
                        }
                        
                        if (rateCount == r.length) {
                            Ext.getCmp('rateIndexList').setValue('-1');
                        } else if (rateCount === 0) {
                            Ext.getCmp('rateIndexList').setValue('');
                        } else {
                            Ext.getCmp('rateIndexList').setValue(rateIndexList);
                        }
                    }
                },
                {
                    xtype: 'fieldset',
                    height: 100,
                    title: 'Select Parameter Option',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 200,
                        hideEmptyLabel: false
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'User ID Index',
                            name: 'userIndexList',
                            id: 'userIndexList',                            
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Item ID Index',
                            name: 'itemIndexList',
                            id: 'itemIndexList',                       
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Rating Value Index',
                            name: 'rateIndexList',
                            id: 'rateIndexList',                          
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 160,
                    title: 'Similarity Infomation',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 200,
                        hideEmptyLabel: false
                    },
                    items: [
                    	// Ankus MapReduce가 동작하는데 필요한 유사도 결과 파일의 경로를 지정한다. 이 경로는 1개 지정가능하다.
			            {
			            forceFit: true,
			            columnLines: true, 
			            title: 'Similarity Path',
			            defaults: {
			            	hideLabel: true,
			                //margin: "5 0 0 0"  // Same as CSS ordering (top, right, bottom, left)
			            },
			            layout: 'hbox',
			            items: [
			            	{
			                xtype: '_browserField',
			                name: 'similPath',
			                allowBlank: false,
			                readOnly: false,
			                flex: 1
			                }
			             ]
			             },
			             {
                     	 xtype: 'tbspacer',
                      	 height: 5
                  		 },
			             {
			             xtype: 'fieldcontainer',
                         fieldLabel: MSG.DESIGNER_COL_DELIMITER,
                    	 tooltip: MSG.DESIGNER_MSG_COL_DELIMITER,                                  	 
                         layout: 'hbox',
                    	 items: [
                         	{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                xtype: 'combo',
                                name: 'similDelimiter',
                                value: '\\t',
                                flex: 1,
                                forceSelection: true,
                                multiSelect: false,
                                editable: false,
                                readOnly: this.readOnly,
                                displayField: 'name',
                                valueField: 'value',
                                mode: 'local',
                                queryMode: 'local',
                                triggerAction: 'all',
                                tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                                store: Ext.create('Ext.data.Store', {
                                	fields: ['name', 'value', 'description'],
                                    data: [
                                    	{name: MSG.COMMON_DOUBLE_COLON, value: '::', description: '::'},
                                        {name: MSG.COMMON_COMMA, value: ',', description: ','},
                                        {name: MSG.COMMON_TAB, value: '\\t', description: '\\t'},
                                        {name: MSG.COMMON_BLANK, value: '\\s', description: '\\s'},
                                        {name: MSG.COMMON_USER_DEFINED, value: 'CUSTOM', description: MSG.COMMON_USER_DEFINED}
                                    ]
                                }),
                                listeners: {
                                	change: function (combo, newValue, oldValue, eOpts) {
                                    	// 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
                                        var customValueField = combo.nextSibling('textfield');
                                        if (newValue === 'CUSTOM') {
                                        	customValueField.enable();
                                            customValueField.isValid();
                                    	} else {
                                        	customValueField.disable();
                                            if (newValue) {
                                            	customValueField.setValue(newValue);
                                            } else {
                                                customValueField.setValue('::');
                                            }
                                        }
                                    }
                                }
                                },
                                {
                                xtype: 'textfield',
                                name: 'similDelimiterValue',
                                vtype: 'exceptcommaspace',
                                width: 115,
                                flex: 1,
                                disabled: true,
                                readOnly: this.readOnly,
                                allowBlank: false,
                                value: '\\t'
                                }
                            ]
                            }
                        ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Base Type',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'basedType',
                                    value: 'user',
                                    flex: 1,
                                    forceSelection: true,
                                    multiSelect: false,
                                    disabled: false,
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'value',
                                    mode: 'local',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['name', 'value', 'description'],
                                        data: [
                                            {name: 'USER', value: 'user', description: 'USER'},
                                            {name: 'ITEM', value: 'item', description: 'ITEM'}
                                        ]
                                    })                                    
                                }
                            ]
                        },
			            {
                            xtype: 'textfield',
                            fieldLabel: 'Similarty Threshold',
                            name: 'similThreshold', 
                            id: 'similThreshold',
                            value:0.7,
                            allowBlank: true
                        }                            
                	]
                	},
                	{
                    xtype: 'fieldset',
                    height: 100,
                    title: 'Recommendation Infomation',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 200,
                        hideEmptyLabel: false
                    },
                    items: [
                    	{
                            xtype: 'textfield',
                            fieldLabel: 'Target User ID',
                            name: 'targetUID',
                            id: 'targetUID', 
                            allowBlank: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Target Item ID List',
                            name: 'targetIIDList', 
                            id: 'targetIIDList',                            
                            vtype: 'commaseperatednum',
                            allowBlank: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Top-N Recommendation',
                            name: 'recomCnt', 
                            id: 'recomCnt',
                            value:10,
                            allowBlank: true
                        }
                    ]
                    }
                          
                ]
                } 
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_MAPREDUCE,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'jar',
                    id:'CODENAME_VAR',
                    fieldLabel: MSG.DESIGNER_MR_JAR,                    
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: MSG.DESIGNER_DRIVER,
                    value: 'Recommendation',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_H_CONFIG,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                /*
                 {
                 xtype: '_configurationBrowserField'
                 },
                 */
                {
                    xtype: '_keyValueGrid',
                    flex: 1
                }
            ]
        }
    ],

    /**
     * UI 컴포넌트의 Key를 필터링한다.
     *
     * ex) 다음과 같이 필터를 설정할 수 있다.
     * propFilters: {
     *     // 추가할 프라퍼티
     *     add   : [
     *         {'test1': '1'},
     *         {'test2': '2'}
     *     ],
     *
     *     // 변경할 프라퍼티
     *     modify: [
     *         {'delimiterType': 'delimiterType2'},
     *         {'config': 'config2'}
     *     ],
     *
     *     // 삭제할 프라퍼티
     *     remove: ['script', 'metadata']
     * }
     */
    propFilters: {
        add: [],
        modify: [],
        remove: ['config']
    },

    /**
     * MapReduce의 커맨드 라인 파라미터를 수동으로 설정한다.
     * 커맨드 라인 파라미터는 Flamingo Workflow Engine에서 props.mapreduce를 Key로 꺼내어 구성한다.
     *
     * @param props UI 상에서 구성한 컴포넌트의 Key Value값
     */
    afterPropertySet: function (props) {
        props.mapreduce = {
            "driver": props.driver ? props.driver : '',
            "jar": props.jar ? props.jar : '',
            "confKey": props.hadoopKeys ? props.hadoopKeys : '',
            "confValue": props.hadoopValues ? props.hadoopValues : '',
            params: []
        };

        if (props.input) {
            props.mapreduce.params.push("-input", props.input);
        }

        if (props.output) {
            props.mapreduce.params.push("-output", props.output);
        }
        
        if (props.delimiter) {
            if (props.delimiter == 'CUSTOM') {
                props.mapreduce.params.push("-delimiter", props.delimiterValue);
            } else {
                props.mapreduce.params.push("-delimiter", props.delimiter);
            }
        }
        
        if (props.userIndexList) {
            props.mapreduce.params.push("-uidIndex", props.userIndexList);
        }
        
        if (props.itemIndexList) {
            props.mapreduce.params.push("-iidIndex", props.itemIndexList);
        }
        
        if (props.rateIndexList) {
            props.mapreduce.params.push("-ratingIndex", props.rateIndexList);
        } 

        if (props.similPath) {
            props.mapreduce.params.push("-similPath", props.similPath);
        }
        
        if (props.similDelimiter) {
            if (props.similDelimiter == 'CUSTOM') {
                props.mapreduce.params.push("-similDelimiter", props.similDelimiterValue);
            } else {
                props.mapreduce.params.push("-similDelimiter", props.similDelimiter);
            }
        }
        
        if (props.basedType) {
            props.mapreduce.params.push("-basedType", props.basedType);
        }
        
        if (props.similThreshold) {
            props.mapreduce.params.push("-similThreshold", props.similThreshold);
        }
        
        if (props.targetUID) {
            props.mapreduce.params.push("-targetUID", props.targetUID);
        }
        
        if (props.targetIIDList) {
            props.mapreduce.params.push("-targetIIDList", props.targetIIDList);
        }
        
        if (props.recomCnt) {
            props.mapreduce.params.push("-recomCnt", props.recomCnt);
        }
        

        this.callParent(arguments);
    }
});