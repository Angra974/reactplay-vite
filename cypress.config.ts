import { defineConfig } from 'cypress';
import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";
import { pa11y } from "@cypress-audit/pa11y";


export default defineConfig({
  e2e: {
      setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
        pa11y: pa11y((pa11yReport) => {
          console.log.bind(console)
          console.log(pa11yReport); // raw pa11y reports
        }),
      });
    },
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: false
  }
});
