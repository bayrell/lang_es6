"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
if (typeof BayrellLang == 'undefined') BayrellLang = {};
if (typeof BayrellLang.OpCodes == 'undefined') BayrellLang.OpCodes = {};
BayrellLang.OpCodes.OpAssign = class extends BayrellLang.OpCodes.BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpAssign";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_assign";
		this.ident = null;
		this.value = null;
		this.op_name = "";
	}
	createNewInstance(){
		return Runtime.rtl.newInstance( this.getClassName() );
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.OpCodes.OpAssign){
			this.op = Runtime.rtl._clone(obj.op);
			this.ident = Runtime.rtl._clone(obj.ident);
			this.value = Runtime.rtl._clone(obj.value);
			this.op_name = Runtime.rtl._clone(obj.op_name);
		}
		super.assign(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = Runtime.rtl.correct(value, "string", "op_assign", "");
		else if (variable_name == "ident") this.ident = Runtime.rtl.correct(value, "BayrellLang.OpCodes.BaseOpCode", null, "");
		else if (variable_name == "value") this.value = Runtime.rtl.correct(value, "BayrellLang.OpCodes.BaseOpCode", null, "");
		else if (variable_name == "op_name") this.op_name = Runtime.rtl.correct(value, "string", "", "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "ident") return this.ident;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "op_name") return this.op_name;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("ident");
		names.push("value");
		names.push("op_name");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpAssign";
	}
	/**
	 * Constructor
	 */
	constructor(ident, value, op_name){
		if (ident == undefined) ident=null;
		if (value == undefined) value=null;
		if (op_name == undefined) op_name="";
		super();
		this.ident = ident;
		this.value = value;
		this.op_name = op_name;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}