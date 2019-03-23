import { ScrapeProvider } from './ScrapeContext';
export default function Page({children}) {
    return (
        <ScrapeProvider
            value={{
                hey: 'ho',
                lets: 'go'
            }}
        >
            <div class="page">{children}</div>
        </ScrapeProvider>
    );
}