"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNodeProgram = function(ctx)
{
	Bayrell.Lang.LangES6.TranslatorES6Program.apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype = Object.create(Bayrell.Lang.LangES6.TranslatorES6Program.prototype);
Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeProgram;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangNode.TranslatorNodeProgram)
		{
		}
		Bayrell.Lang.LangES6.TranslatorES6Program.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Bayrell.Lang.LangES6.TranslatorES6Program.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.LangES6.TranslatorES6Program.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeProgram";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram, Bayrell.Lang.LangES6.TranslatorES6Program);
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram,
{
	/**
	 * Translate program
	 */
	translateProgramHeader: function(ctx, t, op_code)
	{
		var content = "\"use strict;\"";
		content += Runtime.rtl.toStr(t.s(ctx, "var use = require('bayrell').use;"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(ctx, t, op_code)
	{
		var content = "";
		var name = "";
		content += Runtime.rtl.toStr("use.add(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(");"));
		content += Runtime.rtl.toStr(t.s(ctx, "if (module.exports == undefined) module.exports = {};"));
		var arr = Runtime.rs.split(ctx, "\\.", t.current_namespace_name);
		for (var i = 0;i < arr.count(ctx);i++)
		{
			name = name + Runtime.rtl.toStr(((i == 0) ? "" : ".")) + Runtime.rtl.toStr(arr.item(ctx, i));
			var s = "if (module.exports." + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" == undefined) module.exports.") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" = {};");
			content += Runtime.rtl.toStr((content == 0) ? s : t.s(ctx, s));
		}
		content += Runtime.rtl.toStr(t.s(ctx, "module.exports." + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeProgram";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNodeProgram",
			"name": "Bayrell.Lang.LangNode.TranslatorNodeProgram",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
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
Runtime.rtl.defClass(Bayrell.Lang.LangNode.TranslatorNodeProgram);