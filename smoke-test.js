const baseUrl = 'http://localhost:3000';
const routes = [
    '/',
    '/login',
    '/transactions/new'
];

async function testRoutes() {
    console.log('🔍 Iniciando verificação de rotas de UI...');
    let hasError = false;

    for (const route of routes) {
        try {
            const start = performance.now();
            const res = await fetch(baseUrl + route);
            const duration = (performance.now() - start).toFixed(0);

            if (res.status === 200) {
                console.log(`✅ ${route} \t [200 OK] \t ${duration}ms`);
            } else if ([307, 308, 302].includes(res.status)) {
                console.log(`⚠️ ${route} \t [Redirect ${res.status}] \t ${duration}ms (Comportamento esperado para Auth)`);
            } else {
                console.log(`❌ ${route} \t [${res.status}] \t ${duration}ms`);
                hasError = true;
            }
        } catch (e) {
            console.log(`❌ ${route} \t [Falha na Conexão] \t ${e.message}`);
            hasError = true;
        }
    }

    if (hasError) {
        console.log('\n❌ Foram encontrados problemas nas rotas.');
        process.exit(1);
    } else {
        console.log('\n✅ Todas as telas principais responderam corretamente.');
    }
}

testRoutes();
