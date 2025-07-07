# Angular Genkit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

## Steps to run the application using SSR

1. Clone the repository:

- [ ] git clone https://github.com/KasiaKasia/angular-genkit.git

2. In the project directory, run the following commands:

- [ ] `npm i`
- [ ] `npm install genkit`
- [ ] `npm install @genkit-ai/googleait`
- [ ] `npm install @genkit-ai/express`
- [ ] `npm install -g genkit-cli`
- [ ] `npm install --save-dev tsx`
- [ ] `npm install cors`
- [ ] `npm run build`
- [ ] `npm run serve:ssr:angular-genkit`

3. <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" aria-label=">Generate an API key">Generate an API key</a> for the Gemini API using Google AI Studio.

4. Set the GEMINI_API_KEY environment variable to your key:

- [ ] `export GEMINI_API_KEY=<your API key>`

5. Next, open a web browser and navigate to the following address: http://localhost:4200/


## Running Genkit developer tools

1. To launch the Genkit developer tools and load your flows in the developer interface (UI), execute the following command:

- [ ] `genkit start -- npx tsx --watch src/genkit/menuSuggestionFlow.ts`

2. Next, open a web browser and navigate to the following address: http://localhost:4000/


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
