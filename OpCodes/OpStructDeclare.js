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
BayrellLang.OpCodes.OpStructDeclare = class extends BayrellLang.OpCodes.OpClassDeclare{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpStructDeclare";}
	static getParentClassName(){return "BayrellLang.OpCodes.OpClassDeclare";}
	_init(){
		super._init();
		this.op = "op_struct";
		this.is_readonly = false;
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.OpCodes.OpStructDeclare){
			this.op = Runtime.rtl._clone(obj.op);
			this.is_readonly = Runtime.rtl._clone(obj.is_readonly);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = Runtime.rtl.correct(value, "string", "op_struct", "");
		else if (variable_name == "is_readonly") this.is_readonly = Runtime.rtl.correct(value, "bool", false, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "is_readonly") return this.is_readonly;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("op");
		names.push("is_readonly");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}