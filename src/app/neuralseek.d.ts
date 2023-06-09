/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/seek": {
    /**
     * Seek an answer from NeuralSeek 
     * @description This endpoint takes an input obect with a user question, context and options and returns a response object
     */
    post: operations["seekAnswer"];
  };
  "/train": {
    /**
     * Submit KnowledgeBase Training 
     * @description Submit KnowledgeBase Training
     */
    post: operations["train"];
  };
  "/analytics": {
    /**
     * Instance Analytics 
     * @description Retrieve an analytics dataset for your instance
     */
    post: operations["analytics"];
  };
  "/test": {
    /**
     * Test questions via batch upload 
     * @description Test questions via batch upload
     */
    post: operations["test"];
  };
  "/user_data": {
    /**
     * Delete all user data 
     * @description This endpoint deletes all user data
     */
    delete: operations["deleteAllData"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    seek: {
      /** @description The user's question for NeuralSeek */
      question: string;
      /** @description Watson Assistant "context" object, containing properties for user id and session. If using this variable do not set "user_session". */
      context?: Record<string, never>;
      user_session?: components["schemas"]["seek_user_session"];
      options?: components["schemas"]["seek_options"];
    };
    seek_response: {
      /** @description The generated answer */
      answer: string;
      /** @description The confidence score of the answer */
      score: string;
      /** @description The top scoring URL (if available) used to train the answer. Set the field you want returned here in on the Configure tab. The field must contain a URL, or it will be ignored. */
      url?: string;
      /** @description The top document (if available) used to train the answer. Set the field you want returned here in on the Configure tab */
      document?: string;
      /** @description Total processing time in milliseconds */
      time?: number;
      /** @description KnowledgeBase response time in milliseconds */
      kbTime?: number;
      /** @description A listing of the passages used for answer summarization. This will only return if includeSourceResults is set to 'true' on the request */
      passages?: (components["schemas"]["seek_response_passages"])[];
      /** @description KnowledgeBase coverage score. How much content was returned from the KnowledgeBase on the subject asked as compared to benchmarks. Low coverage is not necessarily indicitive of bad content. */
      kbCoverage?: number;
      /** @description Sentiment score, 0-9 */
      sentiment?: number;
      /** @description Semantic score (if enabled), 0-100 */
      semanticScore?: number;
    };
    train_body: {
      /** @description The training token. Get this from passages/train */
      train?: string;
      /** @description The relevancy score. An integer, 0-100 */
      score?: number;
    };
    analytics_body: {
      /** @description The number of rows to return */
      count?: number;
    };
    seek_user_session_metadata: {
      /** @description A unique user identifier. */
      user_id?: string;
    };
    seek_user_session_system: {
      /** @description A session identifier for the defined user. */
      session_id?: string;
    };
    /** @description Context tracking object.  Use this or the \"context\" variable. */
    seek_user_session: {
      metadata?: components["schemas"]["seek_user_session_metadata"];
      system?: components["schemas"]["seek_user_session_system"];
    };
    /** @description An object that allows NeuralSeek to tailor a response for a specific user */
    seek_options_personalize: {
      /** @description The name the user should be referred to by */
      preferredName?: string;
      /** @description The user has already been welcomed, do not re-welcome.  Valid value is 'true' or 'false'.  Default value is 'false'. */
      noWelcome?: string;
      /** @description An array of products this customer currently consumes from your company */
      products?: (string)[];
      /** @description Additional details to pass to language generation */
      additionalDetails?: string;
    };
    seek_options_semanticScore: {
      /** @description Enable the semantic Score model.  Valid values are the strings 'true' and 'false' */
      enabled?: string;
      /** @description Use the Semantic Score for minimum and warning confidence thresholds.  Valid values are the strings 'true' and 'false' */
      primary?: string;
    };
    seek_options_lastTurn: {
      /** @description The user input */
      input?: string;
      /** @description The system response.  Text strings only here. */
      response?: string;
    };
    /** @description Optional object for runtime override of Seek options. */
    seek_options: {
      personalize?: components["schemas"]["seek_options_personalize"];
      /** @description Valid values are: en, es, de, it, fr, ja, ar, pt-br, zh-cn, zh-tw, ko, cs, nl, id, xx */
      language?: string;
      /** @description Text to use as a filter against the filter field set in the KnowledgeBase configuration. Use commas to separate multiple strings for an 'or' filter. You can use the filter to isolate a certain subset of documents in the knowledgebase. */
      filter?: string;
      /** @description The company or Brand.  If bias is enabled, bias will be towards this thing. */
      company?: string;
      semanticScore?: components["schemas"]["seek_options_semanticScore"];
      lastTurn?: components["schemas"]["seek_options_lastTurn"];
      /** @description Enable company bias.  Valid values are the strings 'true' and 'false' */
      pullToCompany?: string;
      /** @description Enable Prompt engineering.  Valid values are the strings 'true' and 'false' */
      promptEngineering?: string;
      /** @description Prepend a phrase to cleansed user input. Must enable Prompt Engineering inside the NeuralSeek "Configure" page */
      promptEngineeringPhrase?: string;
      /**
       * @description An array of objects, stringified. 
       * @example [{'re':'/hi/gi', 'rp':'Bye!'}]
       */
      answerEngineering?: string;
      /**
       * @description A whole number from 0 to 100 expressed as s string 
       * @example 5
       */
      warnConfidence?: string;
      /** @description Text to prepend on warning confidence levels */
      warnConfidenceText?: string;
      /**
       * @description A whole number from 0 to 100 expressed as s string 
       * @example 0
       */
      minConfidence?: string;
      /** @description Text to respond with for blocked minimum confidence responses */
      minConfidenceText?: string;
      /**
       * @description Misinformation Tolerance. A whole number from 0 to 100 expressed as a string 
       * @example 0
       */
      misTolerance?: string;
      /** @description Text to respond with for blocked sensitive responses */
      sensitiveText?: string;
      /** @description Text to respond with for blocked minimum word responses */
      minText?: string;
      /** @description Text to respond with for blocked maximum word responses */
      maxWords?: string;
      /** @description URL of the current page when using with a web-based Virtual Agent */
      url?: string;
      /** @description Stump Speech text. Fallback for when all else fails. */
      stump?: string;
      /** @description Include generation source results. Defaults to false.  Valid values are the strings 'true' and 'false' */
      includeSourceResults?: string;
    };
    seek_response_highlights: {
      /** @description Passage highlights ID */
      d?: string;
      /** @description Starting index of the highlight */
      position?: number;
      /** @description Length of the highlight */
      length?: number;
    };
    seek_response_passages: {
      /** @description The passage text */
      passage?: string;
      /** @description The id of the source document in the KB. */
      id?: string;
      /** @description The score of the passage. */
      score?: number;
      /** @description The URL (if available) of the source document. */
      url?: string;
      /** @description The name of the source document. */
      document?: string;
      /** @description The training token for the document. Use this when calling the /train endpoint. */
      train?: string;
      /** @description An array of highlights in the passage. */
      highlights?: (components["schemas"]["seek_response_highlights"])[];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /**
   * Seek an answer from NeuralSeek 
   * @description This endpoint takes an input obect with a user question, context and options and returns a response object
   */
  seekAnswer: {
    /** @description The request object.  Must include the question and a context. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["seek"];
      };
    };
    responses: {
      /** @description Answer response */
      200: {
        content: {
          "application/json": components["schemas"]["seek_response"];
        };
      };
    };
  };
  /**
   * Submit KnowledgeBase Training 
   * @description Submit KnowledgeBase Training
   */
  train: {
    /** @description The request object.  Must include the question and a context. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["train_body"];
      };
    };
    responses: {
      /** @description Success */
      200: never;
    };
  };
  /**
   * Instance Analytics 
   * @description Retrieve an analytics dataset for your instance
   */
  analytics: {
    /** @description The request object.  You may optionally limit the result set using "count" */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["analytics_body"];
      };
    };
    responses: {
      /** @description Success */
      200: never;
    };
  };
  /**
   * Test questions via batch upload 
   * @description Test questions via batch upload
   */
  test: {
    /** @description The questions csv.  Must adhere to the template https://api.neuralseek.com/qa.csv */
    requestBody?: {
      content: {
        "multipart/form-data": components["schemas"]["test_body"];
      };
    };
    responses: {
      /** @description Success */
      200: never;
    };
  };
  /**
   * Delete all user data 
   * @description This endpoint deletes all user data
   */
  deleteAllData: {
    parameters: {
      query: {
        /** @description The intents to delete. If left blank all intents will be deleted. */
        intent?: (string)[];
      };
    };
    responses: {
      /** @description Success */
      200: never;
    };
  };
}
