/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2013.11.30 at 02:11:34 오후 KST 
//


package org.openflamingo.model.workflow;

import javax.xml.bind.annotation.*;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}prepare" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}clusterName" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}classpaths" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}jar" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}className" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}configuration" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}variables" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}input" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}output" minOccurs="0"/>
 *         &lt;element ref="{http://www.openflamingo.org/schema/workflow}command" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="override" type="{http://www.w3.org/2001/XMLSchema}boolean" default="true" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "prepare",
    "clusterName",
    "classpaths",
    "jar",
    "className",
    "configuration",
    "variables",
    "input",
    "output",
    "command"
})
@XmlRootElement(name = "mapreduce")
public class Mapreduce {

    protected Prepare prepare;
    protected ClusterName clusterName;
    protected Classpaths classpaths;
    protected Jar jar;
    protected ClassName className;
    protected Configuration configuration;
    protected Variables variables;
    protected Input input;
    protected Output output;
    protected Command command;
    @XmlAttribute(name = "override")
    protected Boolean override;

    /**
     * Gets the value of the prepare property.
     * 
     * @return
     *     possible object is
     *     {@link Prepare }
     *     
     */
    public Prepare getPrepare() {
        return prepare;
    }

    /**
     * Sets the value of the prepare property.
     * 
     * @param value
     *     allowed object is
     *     {@link Prepare }
     *     
     */
    public void setPrepare(Prepare value) {
        this.prepare = value;
    }

    /**
     * Gets the value of the clusterName property.
     * 
     * @return
     *     possible object is
     *     {@link ClusterName }
     *     
     */
    public ClusterName getClusterName() {
        return clusterName;
    }

    /**
     * Sets the value of the clusterName property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClusterName }
     *     
     */
    public void setClusterName(ClusterName value) {
        this.clusterName = value;
    }

    /**
     * Gets the value of the classpaths property.
     * 
     * @return
     *     possible object is
     *     {@link Classpaths }
     *     
     */
    public Classpaths getClasspaths() {
        return classpaths;
    }

    /**
     * Sets the value of the classpaths property.
     * 
     * @param value
     *     allowed object is
     *     {@link Classpaths }
     *     
     */
    public void setClasspaths(Classpaths value) {
        this.classpaths = value;
    }

    /**
     * Gets the value of the jar property.
     * 
     * @return
     *     possible object is
     *     {@link Jar }
     *     
     */
    public Jar getJar() {
        return jar;
    }

    /**
     * Sets the value of the jar property.
     * 
     * @param value
     *     allowed object is
     *     {@link Jar }
     *     
     */
    public void setJar(Jar value) {
        this.jar = value;
    }

    /**
     * Gets the value of the className property.
     * 
     * @return
     *     possible object is
     *     {@link ClassName }
     *     
     */
    public ClassName getClassName() {
        return className;
    }

    /**
     * Sets the value of the className property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClassName }
     *     
     */
    public void setClassName(ClassName value) {
        this.className = value;
    }

    /**
     * Gets the value of the configuration property.
     * 
     * @return
     *     possible object is
     *     {@link Configuration }
     *     
     */
    public Configuration getConfiguration() {
        return configuration;
    }

    /**
     * Sets the value of the configuration property.
     * 
     * @param value
     *     allowed object is
     *     {@link Configuration }
     *     
     */
    public void setConfiguration(Configuration value) {
        this.configuration = value;
    }

    /**
     * Gets the value of the variables property.
     * 
     * @return
     *     possible object is
     *     {@link Variables }
     *     
     */
    public Variables getVariables() {
        return variables;
    }

    /**
     * Sets the value of the variables property.
     * 
     * @param value
     *     allowed object is
     *     {@link Variables }
     *     
     */
    public void setVariables(Variables value) {
        this.variables = value;
    }

    /**
     * Gets the value of the input property.
     * 
     * @return
     *     possible object is
     *     {@link Input }
     *     
     */
    public Input getInput() {
        return input;
    }

    /**
     * Sets the value of the input property.
     * 
     * @param value
     *     allowed object is
     *     {@link Input }
     *     
     */
    public void setInput(Input value) {
        this.input = value;
    }

    /**
     * Gets the value of the output property.
     * 
     * @return
     *     possible object is
     *     {@link Output }
     *     
     */
    public Output getOutput() {
        return output;
    }

    /**
     * Sets the value of the output property.
     * 
     * @param value
     *     allowed object is
     *     {@link Output }
     *     
     */
    public void setOutput(Output value) {
        this.output = value;
    }

    /**
     * Gets the value of the command property.
     * 
     * @return
     *     possible object is
     *     {@link Command }
     *     
     */
    public Command getCommand() {
        if (command == null) {
            this.command = new Command();
        }
        return command;
    }

    /**
     * Sets the value of the command property.
     * 
     * @param value
     *     allowed object is
     *     {@link Command }
     *     
     */
    public void setCommand(Command value) {
        this.command = value;
    }

    /**
     * Gets the value of the override property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public boolean isOverride() {
        if (override == null) {
            return true;
        } else {
            return override;
        }
    }

    /**
     * Sets the value of the override property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setOverride(Boolean value) {
        this.override = value;
    }

}