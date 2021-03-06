Ext.require([
    'Ext.form.field.ComboBox',
    'Ext.window.MessageBox',
    'Ext.form.FieldSet',
    'Ext.tip.QuickTipManager',
    'Ext.data.*'
]);

// Define the model for a State
Ext.define('State', {
    extend: 'Ext.data.Model',
    fields: [
        {type: 'string', name: 'abbr'},
        {type: 'string', name: 'name'},
        {type: 'string', name: 'slogan'}
    ]
});

// The data for all states
var states = [
    {"abbr": "AL", "name": "Alabama", "slogan": "The Heart of Dixie"},
    {"abbr": "AK", "name": "Alaska", "slogan": "The Land of the Midnight Sun"},
    {"abbr": "AZ", "name": "Arizona", "slogan": "The Grand Canyon State"},
    {"abbr": "AR", "name": "Arkansas", "slogan": "The Natural State"},
    {"abbr": "CA", "name": "California", "slogan": "The Golden State"},
    {"abbr": "CO", "name": "Colorado", "slogan": "The Mountain State"},
    {"abbr": "CT", "name": "Connecticut", "slogan": "The Constitution State"},
    {"abbr": "DE", "name": "Delaware", "slogan": "The First State"},
    {"abbr": "DC", "name": "District of Columbia", "slogan": "The Nation's Capital"},
    {"abbr": "FL", "name": "Florida", "slogan": "The Sunshine State"},
    {"abbr": "GA", "name": "Georgia", "slogan": "The Peach State"},
    {"abbr": "HI", "name": "Hawaii", "slogan": "The Aloha State"},
    {"abbr": "ID", "name": "Idaho", "slogan": "Famous Potatoes"},
    {"abbr": "IL", "name": "Illinois", "slogan": "The Prairie State"},
    {"abbr": "IN", "name": "Indiana", "slogan": "The Hospitality State"},
    {"abbr": "IA", "name": "Iowa", "slogan": "The Corn State"},
    {"abbr": "KS", "name": "Kansas", "slogan": "The Sunflower State"},
    {"abbr": "KY", "name": "Kentucky", "slogan": "The Bluegrass State"},
    {"abbr": "LA", "name": "Louisiana", "slogan": "The Bayou State"},
    {"abbr": "ME", "name": "Maine", "slogan": "The Pine Tree State"},
    {"abbr": "MD", "name": "Maryland", "slogan": "Chesapeake State"},
    {"abbr": "MA", "name": "Massachusetts", "slogan": "The Spirit of America"},
    {"abbr": "MI", "name": "Michigan", "slogan": "Great Lakes State"},
    {"abbr": "MN", "name": "Minnesota", "slogan": "North Star State"},
    {"abbr": "MS", "name": "Mississippi", "slogan": "Magnolia State"},
    {"abbr": "MO", "name": "Missouri", "slogan": "Show Me State"},
    {"abbr": "MT", "name": "Montana", "slogan": "Big Sky Country"},
    {"abbr": "NE", "name": "Nebraska", "slogan": "Beef State"},
    {"abbr": "NV", "name": "Nevada", "slogan": "Silver State"},
    {"abbr": "NH", "name": "New Hampshire", "slogan": "Granite State"},
    {"abbr": "NJ", "name": "New Jersey", "slogan": "Garden State"},
    {"abbr": "NM", "name": "New Mexico", "slogan": "Land of Enchantment"},
    {"abbr": "NY", "name": "New York", "slogan": "Empire State"},
    {"abbr": "NC", "name": "North Carolina", "slogan": "First in Freedom"},
    {"abbr": "ND", "name": "North Dakota", "slogan": "Peace Garden State"},
    {"abbr": "OH", "name": "Ohio", "slogan": "The Heart of it All"},
    {"abbr": "OK", "name": "Oklahoma", "slogan": "Oklahoma is OK"},
    {"abbr": "OR", "name": "Oregon", "slogan": "Pacific Wonderland"},
    {"abbr": "PA", "name": "Pennsylvania", "slogan": "Keystone State"},
    {"abbr": "RI", "name": "Rhode Island", "slogan": "Ocean State"},
    {"abbr": "SC", "name": "South Carolina", "slogan": "Nothing Could be Finer"},
    {"abbr": "SD", "name": "South Dakota", "slogan": "Great Faces, Great Places"},
    {"abbr": "TN", "name": "Tennessee", "slogan": "Volunteer State"},
    {"abbr": "TX", "name": "Texas", "slogan": "Lone Star State"},
    {"abbr": "UT", "name": "Utah", "slogan": "Salt Lake State"},
    {"abbr": "VT", "name": "Vermont", "slogan": "Green Mountain State"},
    {"abbr": "VA", "name": "Virginia", "slogan": "Mother of States"},
    {"abbr": "WA", "name": "Washington", "slogan": "Green Tree State"},
    {"abbr": "WV", "name": "West Virginia", "slogan": "Mountain State"},
    {"abbr": "WI", "name": "Wisconsin", "slogan": "America's Dairyland"},
    {"abbr": "WY", "name": "Wyoming", "slogan": "Like No Place on Earth"}
];

function createStore() {
    // The data store holding the states; shared by each of the ComboBox examples below
    return Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'State',
        data: states
    });
}

Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    var bookStore = new Ext.data.Store({
        proxy: {
            type: 'jsonp',
            startParam: 'startIndex',
            limitParam: 'maxResults',
            url: 'https://www.googleapis.com/books/v1/volumes',
            reader: {
                type: 'json',
                totalProperty: 'totalItems',
                root: 'items'
            }
        },
        fields: [
            {
                name: 'title',
                mapping: function (raw) {
                    var result = raw.volumeInfo.title;
                    if (raw.volumeInfo.subtitle) {
                        result = result + ' - ' + raw.volumeInfo.subtitle;
                    }
                    return result;
                }
            },
            {
                name: 'ISBN',
                mapping: function (raw) {
                    var ids = raw.volumeInfo.industryIdentifiers;
                    return ids ? ids[0].identifier : 'No identifier for this book';
                }
            }
        ]
    });

    var bookCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Select Book',
        renderTo: 'remoteQueryCombo',
        displayField: 'title',
        valueField: 'ISBN',
        width: 500,
        labelWidth: 130,
        store: bookStore,
        queryParam: 'q',
        queryMode: 'remote',

        // Do not use the default "all" for unbounded remote datasets.
        // Issue the last query again.
        // We could also have used the hideTrigger config
        triggerAction: 'last',

        listConfig: {
            getInnerTpl: function () {
                return '{%var value = this.field.getRawValue().replace(/([.?*+^$[\\]\\\\(){}|-])/g, "\\\\$1");%}' +
                    '{[values.title.replace(new RegExp(value, "i"), function(m) {return "<b>" + m + "</b>";})]}';
            }
        },
        listeners: {
            select: function () {
                Ext.Msg.alert('Chosen book', 'Buying ISBN: ' + this.getValue());
            }
        }
    });

    var Country = Ext.define('Country', {
            extend: 'Ext.data.Model',
            fields: ['name', {
                name: 'region',
                mapping: 'region.value'
            }]
        }),
        countryStore = new Ext.data.Store({
            model: Country,
            proxy: {
                type: 'jsonp',
                callbackKey: 'prefix',
                limitParam: 'per_page',
                url: 'http://api.worldbank.org/countries?format=jsonp',
                reader: {
                    type: 'json',

                    // Response is an array where element [1] is the array of records
                    getData: function (raw) {
                        return raw[1];
                    }
                }
            },
            sorters: {
                property: 'region'
            },

            // Data includes aggregates which are not countries
            filters: {
                fn: function (rec) {
                    return rec.get('region') !== 'Aggregates'
                }
            },
            // Load whole dataset.
            // API only returns 25 by default.
            pageSize: 1000,
            autoLoad: true
        });

    var countryCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Select Country',
        renderTo: 'remoteLoadedCombo',
        displayField: 'name',
        width: 500,
        labelWidth: 130,
        store: countryStore,
        queryMode: 'local',
        tpl: '<ul class="x-list-plain">' +
            '{% var lastRegion, region; %}' +
            '<tpl for=".">' +
            '{% region = values.region;' +
            // Only show region headers when there are more than 10 choices
            'if (this.store.getCount() > 10 && region !== lastRegion) {' +
            'lastRegion = region;%}' +
            '<li class="x-grid-group-hd x-grid-group-title">{region}</li>' +
            '{%}%}' +
            '<li class="x-boundlist-item">' +
            '{name}' +
            '</li>' +
            '</tpl>' +
            '</ul>'
    });

    // Simple ComboBox using the data store
    var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Select a single state',
        renderTo: 'simpleCombo',
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: createStore(),
        queryMode: 'local',
        typeAhead: true
    });

    // ComboBox with a custom item template
    var customTplCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Select a single state',
        renderTo: 'customTplCombo',
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: createStore(),
        queryMode: 'local',
        listConfig: {
            getInnerTpl: function () {
                return '<div data-qtip="{name}. {slogan}">{name} ({abbr})</div>';
            }
        }
    });

    // ComboBox with multiple selection enabled
    var multiCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Select multiple states',
        renderTo: 'multiSelectCombo',
        multiSelect: true,
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: createStore(),
        queryMode: 'local'
    });

    // ComboBox transformed from HTML select
    var transformed = Ext.create('Ext.form.field.ComboBox', {
        typeAhead: true,
        transform: 'stateSelect',
        width: 135,
        forceSelection: true
    });

    ////// Collapsible code panels; ignore: /////

    Ext.select('pre.code').each(function (pre) {
        Ext.create('Ext.form.FieldSet', {
            contentEl: pre,
            renderTo: pre.parent(),
            title: 'View code for this example',
            collapsible: true,
            collapsed: true
        });
    });
});
