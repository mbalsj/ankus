<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:50:00'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
TITLE_EXPR='title = "All Classes";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
		param.type='string';
	}
	PARAM={
		param.name='include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='deprecated API';
		param.description='Controls whether to generate documentation for  any deprecated API.';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='show';
		param.title='Show';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='show.linkTitle';
		param.title='Link Titles (Tooltips)';
		param.type='boolean';
	}
</TEMPLATE_PARAMS>
<STYLES>
	CHAR_STYLE={
		style.name='Default Paragraph Font';
		style.id='cs1';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Frame Item';
		style.id='s1';
		text.font.size='9';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Title';
		style.id='s2';
		text.font.size='9.5';
		text.font.style.bold='true';
		par.margin.bottom='7';
		par.option.nowrap='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs2';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s3';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
}
<ROOT>
	<ELEMENT_ITER>
		DESCR='iterates by all classes to be documented'
		ALWAYS_PROC_HDRFTR
		TARGET_ET='ClassDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> classes^::ClassDoc';
		}
		FILTER='// if this is a nested class, include only when it is static
(getAttrValue("containingClass") == null || getAttrBooleanValue("isStatic"))
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
		SORTING='by-expr'
		SORTING_KEY={expr='/* this sorting key places at the bottom of the list
all classes whose name starts with \'_\' (which is how 
the Standard Doclet generates the "All Classes" list!) */

name = getAttrStringValue("name");
name.startsWith("_") ? name : "!" + name',ascending}
		<BODY>
			<AREA_SEC>
				COND='! getAttrBooleanValue("isInterface")'
				BREAK_PARENT_BLOCK='when-executed'
				FMT={
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
									TARGET_FRAME_EXPR='"detail"'
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
								</DOC_HLINK>
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					text.font.style.italic='true';
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
									TARGET_FRAME_EXPR='"detail"'
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
								</DOC_HLINK>
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
		<HEADER>
			<AREA_SEC>
				FMT={
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='All Classes'
								<DOC_HLINK>
									TARGET_FRAME_EXPR='"detail"'
									HKEYS={
										'"all-classes-summary"';
									}
								</DOC_HLINK>
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
</ROOT>
<STOCK_SECTIONS>
	<AREA_SEC>
		SS_NAME='Class Link Title'
		MATCHING_ET='ClassDoc'
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isInterface")'
						TEXT='interface'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isClass") && ! getAttrBooleanValue("isEnum")'
						TEXT='class'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isEnum")'
						TEXT='enum'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isAnnotationType")'
						TEXT='annotation'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='in'
					</TEXT_CTRL>
					<DATA_CTRL>
						FORMULA='((name = getAttrValue("containingPackageName")) != "" ? name : "<unnamed>")'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</STOCK_SECTIONS>
CHECKSUM='V1LYy+aFf5MkMBAkXZHAjfOK2tcVx9ZkZfQ+rUYqPKw'
</DOCFLEX_TEMPLATE>