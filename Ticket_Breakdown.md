# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

This is a user story, thus, it should be handled in a single story ticket which could have subtasks.

## The main ticket for the user story:

_We would like to have the possibility of setting custom identifiers to our facilities agents, so we can match them with our records and systems._

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

**Acceptance Criteria:**

- Implement the custom identifier setter tool on the UI, based on [this prototype](https://www.sketch.com/s/XXXXXXX-caff-4673-84a1-d1082c6a14d4/a/1Kwj1yk).
- Update the report generator feature, so the agent identifiers used belongs to the custom ones defined by the user.
- In case of not having an agent without a custom identifier, use the same identifier used before this update: the database one.

**Subtasks:**

- Build the custom identifier setter tool.
- Update the report generator web service to allow custom identifiers.

## (Subtask) Build the custom identifier setter tool:

_We would like to have the possibility of setting custom identifiers to our facilities agents, so we can match them with our records and systems._

**Acceptance Criteria:**
We need to update the UI so allowed users can customize each agent identifier. Thus:

- Implement the custom identifier setter tool on the UI, based on [this prototype](https://www.sketch.com/s/XXXXXXX-caff-4673-84a1-d1082c6a14d4/a/1Kwj1yk), on the [Facility Agents](https://google.com) page.
- Restrict the custom identifier setter tool to `ADMIN` and `FACILITY_MANAGER` roles.

## (Subtask) Update the report generator web service to allow custom identifiers:

_We would like to have the possibility of setting custom identifiers to our facilities agents, so we can match them with our records and systems._

**Acceptance Criteria:**
We need to update the web service so allowed users can customize each agent identifier. Thus:

- Update the `generateReport` web service for using the custom identifiers instead of the database ones.
- If an agent has no custom identifier, use the database one as the default.
