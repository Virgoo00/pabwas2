document.addEventListener('DOMContentLoaded', () => {
    // Get query parameter for coin symbol
    const urlParams = new URLSearchParams(window.location.search);
    const symbol = urlParams.get('symbol');

    // Create and insert the TradingView advanced chart script
    const advancedChartScript = document.createElement('script');
    advancedChartScript.type = 'text/javascript';
    advancedChartScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    advancedChartScript.async = true;
    advancedChartScript.innerHTML = `
        {
            "autosize": true,
            "symbol": "${symbol}USD",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        }
    `;
    document.getElementById('tradingview-advanced-chart').appendChild(advancedChartScript);

    // Create and insert the TradingView hotlists script
    const hotlistsScript = document.createElement('script');
    hotlistsScript.type = 'text/javascript';
    hotlistsScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
    hotlistsScript.async = true;
    hotlistsScript.innerHTML = `
        {
            "colorTheme": "light",
            "dateRange": "12M",
            "exchange": "US",
            "showChart": true,
            "locale": "en",
            "largeChartUrl": "",
            "isTransparent": false,
            "showSymbolLogo": false,
            "showFloatingTooltip": false,
            "width": "400",
            "height": "550",
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(19, 23, 34, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)"
        }
    `;
    document.getElementById('tradingview-hotlists').appendChild(hotlistsScript);

    // Create and insert the TradingView mini symbol overview script
    const miniSymbolOverviewScript = document.createElement('script');
    miniSymbolOverviewScript.type = 'text/javascript';
    miniSymbolOverviewScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    miniSymbolOverviewScript.async = true;
    miniSymbolOverviewScript.innerHTML = `
        {
        "symbol": "${symbol}USD",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "light",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
        }
    `;
    document.getElementById('tradingview-mini-symbol-overview').appendChild(miniSymbolOverviewScript);
    
    // Create and insert the TradingView technical analysis script
    const technicalAnalysisScript = document.createElement('script');
    technicalAnalysisScript.type = 'text/javascript';
    technicalAnalysisScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    technicalAnalysisScript.async = true;
    technicalAnalysisScript.innerHTML = `
        {
        "interval": "1m",
        "width": "100%",
        "isTransparent": false,
        "height": "100%",
        "symbol": "${symbol}USD",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "light"
        }
    `;
    document.getElementById('tradingview-technical-analysis').appendChild(technicalAnalysisScript);

        // Create and insert the TradingView financials script
    const financialsScript = document.createElement('script');
    financialsScript.type = 'text/javascript';
    financialsScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    financialsScript.async = true;
    financialsScript.innerHTML = `
        {
        "isTransparent": false,
        "largeChartUrl": "",
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "colorTheme": "light",
        "symbol": "${symbol}USD",
        "locale": "en"
        }
    `;
    document.getElementById('tradingview-financials').appendChild(financialsScript);

    
});
