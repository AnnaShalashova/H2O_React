import DefaultLayout from "../../components/Layout/DefaultLayout";
import AnotherPage from "../../pages/AnotherPage/AnotherPage";
import { ReportPageAsync } from "../../pages/ReportPage";

export const routerConfig = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <AnotherPage title="Home Page" />,
            },
            {
                path: 'reports',
                element: <ReportPageAsync />,
            },
            {
                path: 'another',
                element: <AnotherPage title="Another Page" />,
            },
        ],
    },
]