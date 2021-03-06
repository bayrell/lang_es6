"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpAssignStruct = function(ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssignStruct.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAssignStruct.prototype.constructor = Bayrell.Lang.OpCodes.OpAssignStruct;
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.var_name = "";
		this.annotations = null;
		this.comments = null;
		this.names = null;
		this.expression = null;
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpAssignStruct)
		{
			this.var_name = o.var_name;
			this.annotations = o.annotations;
			this.comments = o.comments;
			this.names = o.names;
			this.expression = o.expression;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "var_name")this.var_name = v;
		else if (k == "annotations")this.annotations = v;
		else if (k == "comments")this.comments = v;
		else if (k == "names")this.names = v;
		else if (k == "expression")this.expression = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "var_name")return this.var_name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "names")return this.names;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.OpCodes.OpAssignStruct";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssignStruct";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("var_name");
			a.push("annotations");
			a.push("comments");
			a.push("names");
			a.push("expression");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "var_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "names") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAssignStruct);