import { HttpClient } from "./HttpClient";

export class Document1Api extends HttpClient {
  protected static override prefix: string = "/document1";

  // feck data api
  public static override getPaging<T = any>(params: any = null) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve({
          items: [
            {
              id: 1,
              name: "Test 1",
              age: 1,
              address: "address 1",
            },
            {
              id: 2,
              name: "Test 2",
              age: 2,
              address: "address 2",
            },
            {
              id: 3,
              name: "Test 3",
              age: 3,
              address: "address 3",
            },
            {
              id: 4,
              name: "Test 4",
              age: 4,
              address: "address 4",
            },
            {
              id: 5,
              name: "Test 5",
              age: 5,
              address: "address 5",
            },
            {
              id: 6,
              name: "Test 6",
              age: 6,
              address: "address 6",
            },
            {
              id: 7,
              name: "Test 7",
              age: 7,
              address: "address 7",
            },
            {
              id: 8,
              name: "Test 8",
              age: 8,
              address: "address 8",
            },
            {
              id: 9,
              name: "Test 9",
              age: 9,
              address: "address 9",
            },
            {
              id: 10,
              name: "Test 10",
              age: 10,
              address: "address 10",
            },
          ],
          paging: {
            page: 1,
            size: 10,
            count: 120,
          },
        });
      }, 2000);
    });
  }
}
