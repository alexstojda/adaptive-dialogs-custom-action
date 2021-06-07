// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  Expression,
  NumberExpression,
  NumberExpressionConverter,
  StringExpression,
  StringExpressionConverter,
} from "adaptive-expressions";

import {
  Converter,
  ConverterFactory,
  Dialog,
  DialogConfiguration,
  DialogContext,
  DialogTurnResult,
  PromptOptions,
} from "botbuilder-dialogs";

export interface MultiplyDialogConfiguration extends DialogConfiguration {
  arg1: number | string | Expression | NumberExpression;
  arg2: number | string | Expression | NumberExpression;
  resultProperty?: string | Expression | StringExpression;
}

export class MultiplyDialog
  extends Dialog
  implements MultiplyDialogConfiguration {
  public static $kind = "AdaptiveJSDemo.MultiplyDialog";

  public arg1: NumberExpression = new NumberExpression(0);
  public arg2: NumberExpression = new NumberExpression(0);
  public resultProperty?: StringExpression;

  /**
   * Creates a new ActivityPrompt instance.
   * @param dialogId Unique ID of the dialog within its parent `DialogSet` or `ComponentDialog`.
   */
  constructor(dialogId?: string) {
    super(dialogId);
  }

  public getConverter(
    property: keyof MultiplyDialogConfiguration
  ): Converter | ConverterFactory {
    switch (property) {
      case "arg1":
        return new NumberExpressionConverter();
      case "arg2":
        return new NumberExpressionConverter();
      case "resultProperty":
        return new StringExpressionConverter();
      default:
        return super.getConverter(property);
    }
  }

  public beginDialog(dc: DialogContext, options?: PromptOptions): Promise<DialogTurnResult> {
    console.log("HELLO WORLD")

    const arg1 = this.arg1.getValue(dc.state);
    const arg2 = this.arg2.getValue(dc.state);

    const result = arg1 * arg2;
    if (this.resultProperty) {
      dc.state.setValue(this.resultProperty.getValue(dc.state), result);
    }

    return dc.endDialog(result);
  }

  protected onComputeId(): string {
    return "AdaptiveJSDemo.MultiplyDialog";
  }
}
