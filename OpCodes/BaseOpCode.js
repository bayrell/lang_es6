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
Bayrell.Lang.OpCodes.BaseOpCode = function(ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.OpCodes.BaseOpCode.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.OpCodes.BaseOpCode.prototype.constructor = Bayrell.Lang.OpCodes.BaseOpCode;
Object.assign(Bayrell.Lang.OpCodes.BaseOpCode.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.caret_start = null;
		this.caret_end = null;
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.BaseOpCode)
		{
			this.caret_start = o.caret_start;
			this.caret_end = o.caret_end;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "caret_start")this.caret_start = v;
		else if (k == "caret_end")this.caret_end = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "caret_start")return this.caret_start;
		else if (k == "caret_end")return this.caret_end;
		return Runtime.CoreStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
});
Object.assign(Bayrell.Lang.OpCodes.BaseOpCode, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.OpCodes.BaseOpCode,
{
	op: "",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.BaseOpCode",
			"name": "Bayrell.Lang.OpCodes.BaseOpCode",
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
			a.push("caret_start");
			a.push("caret_end");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "op") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.BaseOpCode",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_start") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.BaseOpCode",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_end") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.BaseOpCode",
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.BaseOpCode);