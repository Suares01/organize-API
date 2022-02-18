/* eslint-disable no-var */
/* eslint-disable vars-on-top */

import { SuperTest, Test } from "supertest";

declare global {
  var testRequest: SuperTest<Test>;
}
