import { http, HttpResponse, HttpHandler } from "msw";
import { API_BASE_URL } from "../../api";

function serverApi(path: string): string {
  return new URL(path, API_BASE_URL).toString();
}

export const handlers: HttpHandler[] = [
  http.get("/resource", () => HttpResponse.json({ id: "abc-123" })),
  http.get(serverApi("images"), () =>
    HttpResponse.json([
      {
        categoryId: 1,
        images: [
          {
            id: 3,
            imageUrl:
              "https://pub-78d18efa4b2b46d4b2d7d76d085c391f.r2.dev/edf5f7dc8b2541f287a728114ad1d410",
            categoryId: 1,
            tagList: ["success", "pop_team_epic"],
          },
        ],
      },
    ])
  ),
];
