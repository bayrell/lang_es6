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
Bayrell.Lang.OpCodes.OpDeclareFunctionArg = function(__ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_function_arg";
		if (a.indexOf("op") == -1) defProp(this, "op");
		this.__pattern = null;
		if (a.indexOf("pattern") == -1) defProp(this, "pattern");
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpDeclareFunctionArg)
		{
			this.__op = o.__op;
			this.__pattern = o.__pattern;
			this.__name = o.__name;
			this.__expression = o.__expression;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "pattern")this.__pattern = v;
		else if (k == "name")this.__name = v;
		else if (k == "expression")this.__expression = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "pattern")return this.__pattern;
		else if (k == "name")return this.__name;
		else if (k == "expression")return this.__expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunctionArg";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunctionArg";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunctionArg",
			"name": "Bayrell.Lang.OpCodes.OpDeclareFunctionArg",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("op");
			a.push("pattern");
			a.push("name");
			a.push("expression");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDeclareFunctionArg);