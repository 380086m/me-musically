import { Buffer } from "buffer";
import { Account } from "./AuthConstants";

export class Auth {
  private constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUri: string
  ) {}

  private static instance: Auth;

  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth(
        process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
        process.env.REACT_APP_SPOTIFY_CLIENT_SECRET!,
        process.env.REACT_APP_SPOTIFY_REDIRECT_URI!
      );
    }
    return Auth.instance;
  }

  public async getAccessToken() {
    return await this.requestAccessToken();
  }

  public async requestAuth() {
    const scopes = [
      "user-top-read",
      "user-read-currently-playing",
      "user-read-playback-state",
    ];
    const url =
      Account.authorizeUrl +
      "?client_id=" +
      this.clientId +
      "&response_type=code&redirect_uri=" +
      this.redirectUri +
      "&scope=" +
      scopes.join("%20") +
      "&state=2";
    window.location.replace(url);
  }

  public async requestAccessToken(code: string = ""): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    const response = await fetch(Account.tokenUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(this.clientId + ":" + this.clientSecret).toString(
            "base64"
          ),
      },
      body:
        code.length > 0
          ? `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirectUri}`
          : `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const data = await response.json();
    if (data.refresh_token) {
      localStorage.setItem("refreshToken", data.refresh_token);
    }
    return data.access_token;
  }
}
