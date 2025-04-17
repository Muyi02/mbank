import React from "react";
import { render, screen } from "@testing-library/react";
import RecentTransactions from "../RecentTransactions"; // Adjust path if needed
import "@testing-library/jest-dom"; // For better matchers

// Mocking child components (to prevent full rendering in test)
jest.mock("../BankTabItem", () => () => <div data-testid="bank-tab-item" />);
jest.mock("../BankInfo", () => () => <div data-testid="bank-info" />);
jest.mock("../TransactionsTable", () => () => <div data-testid="transactions-table" />);
jest.mock("../Pagination", () => () => <div data-testid="pagination" />);

// ✅ Updated Mock Data to Fully Match Types
const mockAccounts: Account[] = [
  {
    id: "1",
    availableBalance: 5000,
    currentBalance: 5200,
    officialName: "Bank A Checking",
    mask: "1234",
    institutionId: "inst_1",
    name: "Bank A",
    type: "checking",
    subtype: "personal",
    appwriteItemId: "acc1",
    shareableId: "share_1",
  },
  {
    id: "2",
    availableBalance: 3000,
    currentBalance: 3100,
    officialName: "Bank B Savings",
    mask: "5678",
    institutionId: "inst_2",
    name: "Bank B",
    type: "savings",
    subtype: "personal",
    appwriteItemId: "acc2",
    shareableId: "share_2",
  },
];

const mockTransactions: Transaction[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  $id: `trans_${i + 1}`,
  name: `Transaction ${i + 1}`,
  paymentChannel: "Credit Card",
  type: "expense",
  accountId: "account_1",
  amount: 100 + i,
  pending: false,
  category: "Shopping",
  date: "2024-03-20",
  image: "https://example.com/image.png",
  $createdAt: "2024-03-20T12:00:00Z",
  channel: "Online",
  senderBankId: "bank_123",
  receiverBankId: "bank_456",
}));

describe("RecentTransactions Component", () => {
  it("should render the Recent Transactions title", () => {
    render(
      <RecentTransactions
        accounts={mockAccounts}
        transactions={mockTransactions}
        appwriteItemId="acc1"
        page={1}
      />
    );

    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();
  });

  it("should display account tabs", () => {
    render(
      <RecentTransactions
        accounts={mockAccounts}
        transactions={mockTransactions}
        appwriteItemId="acc1"
        page={1}
      />
    );

    expect(screen.getAllByTestId("bank-tab-item")).toHaveLength(2);
  });

  it("should render transactions table", () => {
    render(
      <RecentTransactions
        accounts={mockAccounts}
        transactions={mockTransactions}
        appwriteItemId="acc1"
        page={1}
      />
    );

    expect(screen.getByTestId("transactions-table")).toBeInTheDocument();
  });

  it("should display pagination if transactions exceed 10", () => {
    render(
      <RecentTransactions
        accounts={mockAccounts}
        transactions={mockTransactions} // More than 10 transactions
        appwriteItemId="acc1"
        page={1}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
