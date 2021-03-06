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

Ext.define('Flamingo.view.hive.browser.DatabaseCreatorPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.hiveDBCreator',

    bodyPadding: 5,

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'fieldcontainer',
                layout: 'vbox',
                defaults: {
                    width: 340
                },
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'dbTextField',
                        name: 'databaseName',
                        fieldLabel: 'Database Name',
                        allowBlank: false,
                        value: ''
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'commentTextField',
                        name: 'comment',
                        fieldLabel: 'Comment'
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {
                    width: 340
                },
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'locationTextField',
                        name: 'location',
                        fieldLabel: 'Location'
                    },
                    {
                        xtype: 'button',
                        itemId: 'browseButton',
                        text: 'Browse',
                        width: 60,
                        handler: function () {
                        }
                    }
                ]
            }
        ];

        me.callParent(arguments);
    }
});