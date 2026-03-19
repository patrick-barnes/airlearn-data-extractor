import { APIClient } from "../api-client/api-client.js";

// fetch learned lexemes data
let apiClient: APIClient = new APIClient();
apiClient.fetchAndSaveWords();
