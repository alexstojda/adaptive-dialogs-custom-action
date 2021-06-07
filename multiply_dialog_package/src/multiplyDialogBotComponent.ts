// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {BotComponent} from "botbuilder";
import {Configuration, ServiceCollection} from 'botbuilder-dialogs-adaptive-runtime-core';
import {ComponentDeclarativeTypes} from "botbuilder-dialogs-declarative";

import {MultiplyDialog} from "./multiplyDialog";

export class MultiplyDialogBotComponent extends BotComponent {
    configureServices(services: ServiceCollection, _configuration: Configuration): void {
        console.log("Registering MultiplyDialog")
        services.composeFactory<ComponentDeclarativeTypes[]>('declarativeTypes', (declarativeTypes) =>
            declarativeTypes.concat({
                getDeclarativeTypes() {
                    return [
                        {
                            kind: MultiplyDialog.$kind,
                            type: MultiplyDialog,
                        },
                    ];
                },
            })
        );
    }
}