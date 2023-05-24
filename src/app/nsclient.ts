import axios, { AxiosInstance } from 'axios';

export interface SeekUserSession {
    metadata: { user_id: string };
    system: { session_id: string };
}

// Seek options type
export interface SeekOptions {
    personalize?: {
        preferredName: string;
        noWelcome: string;
        products: string[];
        additionalDetails: string;
    };
    language?: string;
    filter?: string;
    company?: string;
    semanticScore?: { enabled: string; primary: string };
    lastTurn?: { input: string; response: string };
    pullToCompany?: string;
    promptEngineering?: string;
    promptEngineeringPhrase?: string;
    answerEngineering?: string;
    warnConfidence?: string;
    warnConfidenceText?: string;
    minConfidence?: string;
    minConfidenceText?: string;
    misTolerance?: string;
    sensitiveText?: string;
    minText?: string;
    maxWords?: string;
    url?: string;
    stump?: string;
    includeSourceResults?: string;
}

// Seek request and response types
export interface SeekRequest {
    question: string;
    context?: object;
    user_session?: SeekUserSession;
    options?: SeekOptions;
}

export interface SeekResponsePassages {
    passage: string;
    id: string;
    score: number;
    url: string;
    document: string;
    train: string;
    highlights: { d: string; position: number; length: number }[];
}

export interface SeekResponse {
    answer: string;
    score: string;
    url: string;
    document: string;
    time: number;
    kbTime: number;
    passages?: SeekResponsePassages[];
    KBscore: number;
    kbCoverage: number;
    sentiment: number;
    semanticScore: number;
    totalCount: number;
}

const createClient = (apiKey: string, instanceId: string): AxiosInstance => {
    return axios.create({
        baseURL: `https://api.neuralseek.com/v1/${instanceId}`,
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
        },
        responseType: 'json',
    });
}

export class NSClient {
    private client: AxiosInstance;

    constructor(apiKey: string, instanceId: string) {
        this.client = createClient(apiKey, instanceId);
    }

    public async seek(req: SeekRequest): Promise<SeekResponse> {
        const response = await this.client.post<SeekResponse>('/seek', req);
        // @ts-ignore
        return response.data;
    }
}
