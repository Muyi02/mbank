import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import HeaderBox from '@/components/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { AccountSelectionCardinality } from 'plaid';
import RecentTransactions from '@/components/RecentTransactions';
import { getCurrentScope } from '@sentry/nextjs';

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {

    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts ({userId: loggedIn.$id})

    if (!accounts)return;


    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount ({appwriteItemId})

    console.log({ accountsData, account})
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                  type='greeting'
                  title='Welcome'
                  user={loggedIn?.firstName || 'Guest'}
                  subtext='To MBank where you can monitor move and manage your finances'
                />

               <TotalBalanceBox
                 accounts={accountsData}
                 totalBanks={accounts?.totalBanks}
                 totalCurrentBalance={accounts?.totalCurrentBalance}
               /> 
            </header>

            <RecentTransactions

               accounts={accountsData}
               transactions ={account?.transactions}
               appwriteItemId = {appwriteItemId}
               page={currentPage}
              
            />
        </div>

        <RightSidebar
           user={loggedIn}
           transactions={account?.transactions}
           banks={accountsData?.slice(0,2)}
         />
    </section>
  )
}

export default Home