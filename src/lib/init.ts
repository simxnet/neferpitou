process.env.NODE_ENV ??= 'development';

import { setup } from '@skyra/env-utilities';
import * as colorette from 'colorette';

setup();

colorette.createColors({ useColor: true });