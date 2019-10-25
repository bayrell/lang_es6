"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Program = function(__ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6Program.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.LangES6.TranslatorES6Program.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6Program;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangES6.TranslatorES6Program)
		{
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		Runtime.CoreStruct.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.CoreStruct.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program,
{
	/**
	 * To pattern
	 */
	toPattern: function(__ctx, t, pattern)
	{
		var names = t.expression.constructor.findModuleNames(__ctx, t, pattern.entity_name.names);
		var e = Runtime.rs.join(__ctx, ".", names);
		var a = (pattern.template != null) ? pattern.template.map(__ctx, (__ctx, pattern) => 
		{
			return this.toPattern(__ctx, t, pattern);
		}) : null;
		var b = (a != null) ? ",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", a)) + Runtime.rtl.toStr("]") : "";
		return "{\"e\":" + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("}");
	},
	/**
	 * OpNamespace
	 */
	OpNamespace: function(__ctx, t, op_code)
	{
		var content = "";
		var name = "";
		var s = "";
		var arr = Runtime.rs.split(__ctx, "\\.", op_code.name);
		for (var i = 0;i < arr.count(__ctx);i++)
		{
			name = name + Runtime.rtl.toStr(((i == 0) ? "" : ".")) + Runtime.rtl.toStr(arr.item(__ctx, i));
			s = "if (typeof " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" == 'undefined') ") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" = {};");
			content += Runtime.rtl.toStr(t.s(__ctx, s));
		}
		t = t.copy(__ctx, { "current_namespace_name": op_code.name });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(__ctx, t, op_code)
	{
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = t.copy(__ctx, { "current_function": op_code.fn_create });
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(__ctx, t);
		if (op_code.fn_create == null)
		{
			open += Runtime.rtl.toStr(t.current_class_full_name + Runtime.rtl.toStr(" = "));
			open += Runtime.rtl.toStr("function(__ctx)");
			open = t.s(__ctx, open) + Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			/* Call parent */
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(__ctx, t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name) + Runtime.rtl.toStr(".apply(this, arguments);")));
			}
		}
		else
		{
			open += Runtime.rtl.toStr(t.current_class_full_name + Runtime.rtl.toStr(" = function("));
			var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, op_code.fn_create);
			t = res[0];
			open += Runtime.rtl.toStr(res[1]);
			open += Runtime.rtl.toStr(")");
			open = t.s(__ctx, open) + Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
		}
		/* Function body */
		if (op_code.fn_create != null)
		{
			var res = t.operator.constructor.Operators(__ctx, t, (op_code.fn_create.expression) ? op_code.fn_create.expression : op_code.fn_create.value);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		/* Constructor end */
		content = open + Runtime.rtl.toStr(content);
		t = t.levelDec(__ctx);
		content += Runtime.rtl.toStr(t.s(__ctx, "};"));
		return Runtime.Collection.from([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBodyStatic: function(__ctx, t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var current_class_extends_name = t.expression.constructor.findModuleName(__ctx, t, t.current_class_extends_name);
		/* Returns parent class name */
		var parent_class_name = "";
		if (op_code.class_extends != null)
		{
			var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, op_code.class_extends);
			parent_class_name = res[1];
		}
		if (current_class_extends_name != "")
		{
			content += Runtime.rtl.toStr(t.s(__ctx, "Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, current_class_extends_name)) + Runtime.rtl.toStr(");")));
		}
		content += Runtime.rtl.toStr(t.s(__ctx, "Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(",")));
		content += Runtime.rtl.toStr(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		/* Static variables */
		if (op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (!is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					var res = t.expression.constructor.Expression(__ctx, t, value.expression);
					var s = (value.expression != null) ? res[1] : "null";
					content += Runtime.rtl.toStr(t.s(__ctx, value.var_name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(",")));
				}
			}
		}
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			/* Static Functions */
			if (op_code.functions != null)
			{
				t = t.copy(__ctx, { "is_static_function": true });
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (!f.isStatic(__ctx))
					{
						continue;
					}
					/* Set function name */
					t = t.copy(__ctx, { "current_function": f });
					var s = "";
					var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, f);
					var args = res[1];
					s += Runtime.rtl.toStr(f.name + Runtime.rtl.toStr(": function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
					var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, f);
					s += Runtime.rtl.toStr(res[1]);
					s += Runtime.rtl.toStr(",");
					/* Function comments */
					var res = t.operator.constructor.AddComments(__ctx, t, f.comments, t.s(__ctx, s));
					content += Runtime.rtl.toStr(res[1]);
				}
			}
			content += Runtime.rtl.toStr(t.s(__ctx, "/* ======================= Class Init Functions ======================= */"));
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getCurrentNamespace: function()"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getCurrentClassName: function()"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get parent class name function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getParentClassName: function()"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, current_class_extends_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Class info */
			content += Runtime.rtl.toStr(t.s(__ctx, "getClassInfo: function(__ctx)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			var s1 = "";
			s1 += Runtime.rtl.toStr(t.s(__ctx, "var Collection = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + Runtime.rtl.toStr(";")));
			s1 += Runtime.rtl.toStr(t.s(__ctx, "var Dict = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Dict")) + Runtime.rtl.toStr(";")));
			s1 += Runtime.rtl.toStr(t.s(__ctx, "var IntrospectionInfo = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Annotations.IntrospectionInfo")) + Runtime.rtl.toStr(";")));
			s1 += Runtime.rtl.toStr(t.s(__ctx, "return new IntrospectionInfo(__ctx, {"));
			t = t.levelInc(__ctx);
			s1 += Runtime.rtl.toStr(t.s(__ctx, "\"kind\": IntrospectionInfo.ITEM_CLASS,"));
			s1 += Runtime.rtl.toStr(t.s(__ctx, "\"class_name\": " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
			s1 += Runtime.rtl.toStr(t.s(__ctx, "\"name\": " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
			s1 += Runtime.rtl.toStr(t.s(__ctx, "\"annotations\": Collection.from(["));
			t = t.levelInc(__ctx);
			for (var j = 0;j < op_code.annotations.count(__ctx);j++)
			{
				var annotation = op_code.annotations.item(__ctx, j);
				var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, annotation.name);
				t = res[0];
				var name = res[1];
				var res = t.expression.constructor.OpDict(__ctx, t, annotation.params, true);
				t = res[0];
				var params = res[1];
				s1 += Runtime.rtl.toStr(t.s(__ctx, "new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(__ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
			}
			t = t.levelDec(__ctx);
			s1 += Runtime.rtl.toStr(t.s(__ctx, "]),"));
			t = t.levelDec(__ctx);
			s1 += Runtime.rtl.toStr(t.s(__ctx, "});"));
			var save = t.constructor.outputSaveOpCode(__ctx, t);
			if (save != "")
			{
				content += Runtime.rtl.toStr(t.s(__ctx, save));
			}
			content += Runtime.rtl.toStr(s1);
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get fields list of the function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getFieldsList: function(__ctx, f)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "var a = [];"));
			content += Runtime.rtl.toStr(t.s(__ctx, "if (f==undefined) f=0;"));
			if (op_code.vars != null)
			{
				var vars = new Runtime.Map(__ctx);
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var is_static = variable.flags.isFlag(__ctx, "static");
					var is_serializable = variable.flags.isFlag(__ctx, "serializable");
					var is_assignable = true;
					var has_annotation = variable.annotations != null && variable.annotations.count(__ctx) > 0;
					if (is_static)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						is_serializable = true;
						is_assignable = true;
					}
					if (is_serializable)
					{
						is_assignable = true;
					}
					var flag = 0;
					if (is_serializable)
					{
						flag = flag | 1;
					}
					if (is_assignable)
					{
						flag = flag | 2;
					}
					if (has_annotation)
					{
						flag = flag | 4;
					}
					if (flag != 0)
					{
						if (!vars.has(__ctx, flag))
						{
							vars.set(__ctx, flag, new Runtime.Vector(__ctx));
						}
						var v = vars.item(__ctx, flag);
						for (var j = 0;j < variable.values.count(__ctx);j++)
						{
							var value = variable.values.item(__ctx, j);
							v.push(__ctx, value.var_name);
						}
					}
				}
				vars.each(__ctx, (__ctx, v, flag) => 
				{
					content += Runtime.rtl.toStr(t.s(__ctx, "if ((f|" + Runtime.rtl.toStr(flag) + Runtime.rtl.toStr(")==") + Runtime.rtl.toStr(flag) + Runtime.rtl.toStr(")")));
					content += Runtime.rtl.toStr(t.s(__ctx, "{"));
					t = t.levelInc(__ctx);
					v.each(__ctx, (__ctx, varname) => 
					{
						content += Runtime.rtl.toStr(t.s(__ctx, "a.push(" + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, varname)) + Runtime.rtl.toStr(");")));
					});
					t = t.levelDec(__ctx);
					content += Runtime.rtl.toStr(t.s(__ctx, "}"));
				});
			}
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + Runtime.rtl.toStr(".from(a);")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get field info by name */
			content += Runtime.rtl.toStr(t.s(__ctx, "getFieldInfoByName: function(__ctx,field_name)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "return null;"));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get methods list of the function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getMethodsList: function(__ctx)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "var a = ["));
			t = t.levelInc(__ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(__ctx) == 0)
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(__ctx, t.expression.constructor.toString(__ctx, f.name) + Runtime.rtl.toStr(",")));
				}
			}
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "];"));
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + Runtime.rtl.toStr(".from(a);")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get method info by name */
			content += Runtime.rtl.toStr(t.s(__ctx, "getMethodInfoByName: function(__ctx,field_name)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(__ctx) == 0)
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(__ctx, "if (field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, f.name)) + Runtime.rtl.toStr(")")));
					content += Runtime.rtl.toStr(t.s(__ctx, "{"));
					var s1 = "";
					t = t.levelInc(__ctx);
					s1 += Runtime.rtl.toStr(t.s(__ctx, "var Collection = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + Runtime.rtl.toStr(";")));
					s1 += Runtime.rtl.toStr(t.s(__ctx, "var Dict = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Dict")) + Runtime.rtl.toStr(";")));
					s1 += Runtime.rtl.toStr(t.s(__ctx, "var IntrospectionInfo = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Annotations.IntrospectionInfo")) + Runtime.rtl.toStr(";")));
					s1 += Runtime.rtl.toStr(t.s(__ctx, "return new IntrospectionInfo(__ctx, {"));
					t = t.levelInc(__ctx);
					s1 += Runtime.rtl.toStr(t.s(__ctx, "\"kind\": IntrospectionInfo.ITEM_METHOD,"));
					s1 += Runtime.rtl.toStr(t.s(__ctx, "\"class_name\": " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
					s1 += Runtime.rtl.toStr(t.s(__ctx, "\"name\": " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, f.name)) + Runtime.rtl.toStr(",")));
					s1 += Runtime.rtl.toStr(t.s(__ctx, "\"annotations\": Collection.from(["));
					t = t.levelInc(__ctx);
					for (var j = 0;j < f.annotations.count(__ctx);j++)
					{
						var annotation = f.annotations.item(__ctx, j);
						var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, annotation.name);
						t = res[0];
						var name = res[1];
						var res = t.expression.constructor.OpDict(__ctx, t, annotation.params, true);
						t = res[0];
						var params = res[1];
						s1 += Runtime.rtl.toStr(t.s(__ctx, "new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(__ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
					}
					t = t.levelDec(__ctx);
					s1 += Runtime.rtl.toStr(t.s(__ctx, "]),"));
					t = t.levelDec(__ctx);
					s1 += Runtime.rtl.toStr(t.s(__ctx, "});"));
					var save = t.constructor.outputSaveOpCode(__ctx, t);
					if (save != "")
					{
						content += Runtime.rtl.toStr(t.s(__ctx, save));
					}
					content += Runtime.rtl.toStr(s1);
					t = t.levelDec(__ctx);
					content += Runtime.rtl.toStr(t.s(__ctx, "}"));
				}
			}
			content += Runtime.rtl.toStr(t.s(__ctx, "return null;"));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Add implements */
			if (op_code.class_implements != null && op_code.class_implements.count(__ctx) > 0)
			{
				content += Runtime.rtl.toStr(t.s(__ctx, "__implements__:"));
				content += Runtime.rtl.toStr(t.s(__ctx, "["));
				t = t.levelInc(__ctx);
				for (var i = 0;i < op_code.class_implements.count(__ctx);i++)
				{
					var item = op_code.class_implements.item(__ctx, i);
					var module_name = item.entity_name.names.first(__ctx);
					var s = t.expression.constructor.useModuleName(__ctx, t, module_name);
					if (s == "")
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(__ctx, s + Runtime.rtl.toStr(",")));
				}
				t = t.levelDec(__ctx);
				content += Runtime.rtl.toStr(t.s(__ctx, "],"));
			}
		}
		else
		{
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getCurrentNamespace: function()"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s(__ctx, "getCurrentClassName: function()"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
		}
		t = t.levelDec(__ctx);
		content += Runtime.rtl.toStr(t.s(__ctx, "});"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(__ctx, t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		content += Runtime.rtl.toStr(t.s(__ctx, "Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".prototype,")));
		content += Runtime.rtl.toStr(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		/* Functions */
		if (op_code.functions != null)
		{
			t = t.copy(__ctx, { "is_static_function": false });
			for (var i = 0;i < op_code.functions.count(__ctx);i++)
			{
				var f = op_code.functions.item(__ctx, i);
				if (f.flags.isFlag(__ctx, "declare"))
				{
					continue;
				}
				if (f.isStatic(__ctx))
				{
					continue;
				}
				/* Set function name */
				t = t.copy(__ctx, { "current_function": f });
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, f);
				var args = res[1];
				s += Runtime.rtl.toStr(f.name + Runtime.rtl.toStr(": function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, f);
				s += Runtime.rtl.toStr(res[1]);
				s += Runtime.rtl.toStr(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(__ctx, t, f.comments, t.s(__ctx, s));
				content += Runtime.rtl.toStr(res[1]);
			}
		}
		/* Init variables */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter(__ctx, (__ctx, variable) => 
			{
				return !variable.flags.isFlag(__ctx, "static");
			});
			if (t.current_class_full_name != "Runtime.CoreObject" && vars.count(__ctx) > 0)
			{
				content += Runtime.rtl.toStr(t.s(__ctx, "_init: function(__ctx)"));
				content += Runtime.rtl.toStr(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				/* Clear save op codes */
				var save_op_codes = t.save_op_codes;
				var save_op_code_inc = t.save_op_code_inc;
				if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
				{
					content += Runtime.rtl.toStr(t.s(__ctx, "var defProp = use('Runtime.rtl').defProp;"));
					content += Runtime.rtl.toStr(t.s(__ctx, "var a = Object.getOwnPropertyNames(this);"));
				}
				var s1 = "";
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var is_static = variable.flags.isFlag(__ctx, "static");
					if (is_static)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					var prefix = "";
					if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count(__ctx);j++)
					{
						var value = variable.values.item(__ctx, j);
						var res = t.expression.constructor.Expression(__ctx, t, value.expression);
						t = res[0];
						var s = (value.expression != null) ? res[1] : "null";
						s1 += Runtime.rtl.toStr(t.s(__ctx, "this." + Runtime.rtl.toStr(prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
						if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
						{
							var var_name = t.expression.constructor.toString(__ctx, value.var_name);
							s1 += Runtime.rtl.toStr(t.s(__ctx, "if (a.indexOf(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(") == -1) defProp(this, ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(");")));
							/*
							s1 ~= t.s
							(
								"if (a.indexOf(" ~ t.expression::toString(value.var_name) ~ ") == -1)"~
								"Object.defineProperty(this, " ~ t.expression::toString(value.var_name) ~ ",{"~
								"get:function(){return this." ~ prefix ~ value.var_name ~ ";},"~
								"set:function(value){"~
									"throw new Runtime.Exceptions.AssignStructValueError(" ~
										t.expression::toString(value.var_name) ~
									");}"~
								"});"
							);
							*/
						}
					}
				}
				if (t.current_class_extends_name != "")
				{
					s1 += Runtime.rtl.toStr(t.s(__ctx, t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name) + Runtime.rtl.toStr(".prototype._init.call(this,__ctx);")));
				}
				/* Output save op code */
				var save = t.constructor.outputSaveOpCode(__ctx, t, save_op_codes.count(__ctx));
				if (save != "")
				{
					content += Runtime.rtl.toStr(save);
				}
				/* Restore save op codes */
				t = t.copy(__ctx, { "save_op_codes": save_op_codes });
				t = t.copy(__ctx, { "save_op_code_inc": save_op_code_inc });
				/* Add content */
				content += Runtime.rtl.toStr(s1);
				t = t.levelDec(__ctx);
				content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			}
			var is_struct = class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT;
			var var_prefix = (is_struct) ? "__" : "";
			/* Assign Object */
			content += Runtime.rtl.toStr(t.s(__ctx, "assignObject: function(__ctx,o)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "if (o instanceof " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_full_name)) + Runtime.rtl.toStr(")")));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				var is_const = variable.flags.isFlag(__ctx, "const");
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (is_const || is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					content += Runtime.rtl.toStr(t.s(__ctx, "this." + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = o.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
				}
			}
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "}"));
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(__ctx, t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name) + Runtime.rtl.toStr(".prototype.assignObject.call(this,__ctx,o);")));
			}
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Assign Value */
			content += Runtime.rtl.toStr(t.s(__ctx, "assignValue: function(__ctx,k,v)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			var flag = false;
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				var is_const = variable.flags.isFlag(__ctx, "const");
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (is_const || is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					if (t.flag_struct_check_types)
					{
						content += Runtime.rtl.toStr(t.s(__ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = Runtime.rtl.to(v, null, ") + Runtime.rtl.toStr(this.toPattern(__ctx, t, variable.pattern)) + Runtime.rtl.toStr(");")));
					}
					else
					{
						content += Runtime.rtl.toStr(t.s(__ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = v;")));
					}
					flag = true;
				}
			}
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(__ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype.assignValue.call(this,__ctx,k,v);")));
			}
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
			/* Take Value */
			content += Runtime.rtl.toStr(t.s(__ctx, "takeValue: function(__ctx,k,d)"));
			content += Runtime.rtl.toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "if (d == undefined) d = null;"));
			var flag = false;
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				var is_const = variable.flags.isFlag(__ctx, "const");
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (is_const || is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					content += Runtime.rtl.toStr(t.s(__ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, value.var_name)) + Runtime.rtl.toStr(")return this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
					flag = true;
				}
			}
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype.takeValue.call(this,__ctx,k,d);")));
			}
			t = t.levelDec(__ctx);
			content += Runtime.rtl.toStr(t.s(__ctx, "},"));
		}
		/* Get class name function */
		content += Runtime.rtl.toStr(t.s(__ctx, "getClassName: function(__ctx)"));
		content += Runtime.rtl.toStr(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		content += Runtime.rtl.toStr(t.s(__ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + Runtime.rtl.toStr(";")));
		t = t.levelDec(__ctx);
		content += Runtime.rtl.toStr(t.s(__ctx, "},"));
		t = t.levelDec(__ctx);
		content += Runtime.rtl.toStr(t.s(__ctx, "});"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(__ctx, t, op_code)
	{
		var content = t.s(__ctx, "Runtime.rtl.defClass(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(");"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(__ctx, t, op_code)
	{
		if (op_code.is_declare)
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		t = t.copy(__ctx, { "current_class_name": op_code.name });
		t = t.copy(__ctx, { "current_class_full_name": t.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_class_name) });
		if (op_code.class_extends != null)
		{
			var extends_name = Runtime.rs.join(__ctx, ".", op_code.class_extends.entity_name.names);
			t = t.copy(__ctx, { "current_class_extends_name": extends_name });
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = t.copy(__ctx, { "current_class_extends_name": "Runtime.CoreStruct" });
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = t.copy(__ctx, { "current_class_extends_name": "" });
		}
		/* Constructor */
		var res = this.OpDeclareClassConstructor(__ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		/* Extends */
		if (op_code.class_extends != null)
		{
			content += Runtime.rtl.toStr(t.s(__ctx, t.current_class_full_name + Runtime.rtl.toStr(".prototype = Object.create(") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype);")));
			content += Runtime.rtl.toStr(t.s(__ctx, t.current_class_full_name + Runtime.rtl.toStr(".prototype.constructor = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(__ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		/* Class static functions */
		var res = this.OpDeclareClassBodyStatic(__ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		/* Class comments */
		var res = t.operator.constructor.AddComments(__ctx, t, op_code.comments, content);
		content = res[1];
		/* Class footer */
		var res = this.OpDeclareClassFooter(__ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(__ctx, t, op_code)
	{
		if (op_code instanceof Bayrell.Lang.OpCodes.OpNamespace)
		{
			return this.OpNamespace(__ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareClass)
		{
			return this.OpDeclareClass(__ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			return t.operator.constructor.OpComment(__ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			return t.operator.constructor.OpPreprocessorIfCode(__ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(__ctx, t, op_code.items.item(__ctx, i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
			return Runtime.Collection.from([t,content]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(__ctx, t, op_code)
	{
		var content = "\"use strict;\"";
		content += Runtime.rtl.toStr(t.s(__ctx, "var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')" + Runtime.rtl.toStr(" ? Runtime.rtl.find_class : null;")));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(__ctx, t, op_code)
	{
		var content = "";
		if (op_code.uses != null)
		{
			t = t.copy(__ctx, { "modules": op_code.uses });
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(__ctx, t, op_code);
			content += Runtime.rtl.toStr(res[1]);
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var item = op_code.items.item(__ctx, i);
				var res = this.translateItem(__ctx, t, item);
				t = res[0];
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"name": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
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
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6Program);