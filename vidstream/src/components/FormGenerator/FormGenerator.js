import React, { Component } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import InputBox from "../InputBox/InputBox";
import RadioBox from "../RadioBox/RadioBox";
import SelectBox from "../SelectBox/SelectBox";
import "./FormGenerator.css";

class FormGenerator extends Component {
  createElements = (dataParam) => {
    let radioElementsArray = [];
    let selectElementsArray = [];

    if (dataParam.type === "radio") {
      for (let i = 0; i < dataParam.radOpt.length; i++) {
        radioElementsArray.push(
          <>
            <input
              type="radio"
              id={`servRad_${dataParam.radOpt[i]}`}
              name={dataParam.group}
              checked
            />
            <label for={`servRad_${dataParam.radOpt[i]}`}>
              {dataParam.radOpt[i]}
            </label>
          </>
        );
      }
      return radioElementsArray;
    } else if (dataParam.type === "select") {
      for (let i = 0; i < dataParam.selOption.length; i++) {
        selectElementsArray.push(<option>{dataParam.selOption[i]}</option>);
      }
      return selectElementsArray;
    }
  };
  render() {
    const { FormFields, formId } = this.props;
    return (
      <form id={formId} className="container col-4">
        <h3 className="formTitle">{this.props.formTitle}</h3>
        <div className="row text-left d-flex justify-content-center">
          {FormFields.map((data, index) => (
            <div className="col-12">
              {(() => {
                if (
                  data.type === "text" ||
                  data.type === "date" ||
                  data.type === "number" ||
                  data.type === "email" ||
                  data.type === "password"
                ) {
                  return (
                    <InputBox
                      label={data.label}
                      type={data.type}
                      id={data.id}
                      placeholder={data.placeHolder}
                      required={data.required}
                      minLength={data.minLength}
                      name={data.name}
                      changeHandler={
                        data.changeHandler || this.props.changeHandler
                      }
                      key={data.name}
                      errorText={data.error}
                    />
                  );
                } else if (data.type === "select") {
                  return (
                    <SelectBox
                      id={data.id}
                      label={data.label}
                      optional={data.optionalCheck}
                      name={data.name}
                    >
                      {this.createElements(data)}
                    </SelectBox>
                  );
                } else if (data.type === "radio") {
                  return (
                    <div className="formRadio">
                      <p className="radioLabel">{data.radLabel}</p>
                      <RadioBox>{this.createElements(data)}</RadioBox>
                    </div>
                  );
                }
              })()}
            </div>
          ))}

          <PrimaryButton
            type="submit"
            actionFunction={this.props.submitHandler}
            label={this.props.submitLabel}
            className="col-6"
          />
        </div>
      </form>
    );
  }
}

export default FormGenerator;
