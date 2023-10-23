import { DefaultLayout } from "../../components/Layout";
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
                path: 'another_1',
                element: <AnotherPage title="Another Page 1" />,
            },
            {
                path: 'another_2',
                element: <AnotherPage title="Another Page 2" />,
            },
            {
                path: 'another_3',
                element: <AnotherPage title="Another Page 3" />,
            },
            {
                path: 'another_4',
                element: <AnotherPage title="Another Page 4" />,
            },
            {
                path: 'another_5',
                element: <AnotherPage title="Another Page 5" />,
            },
            {
                path: 'another_6',
                element: <AnotherPage title="Another Page 6" />,
            },
        ],
    },
]