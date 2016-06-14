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

Ext.define('Flamingo.view.desktop.SignUp', {
    extend: 'Ext.window.Window',
    alias: 'widget.signUp',

    requires: [
        'Flamingo.view.login.SignUpPanel'
    ],

    title: '',
    width: 500,
    height: 700,
    resizable: false,
    maximizable: false,
    animCollapse: false,
    border: false,
    closeAction: 'hide',
    layout: 'fit',
    closable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'signUpPanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});
