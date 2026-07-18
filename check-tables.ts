import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing env variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  console.log("Checking DB tables structure...");

  // Let's run a query to get constraint details for 'arquivos_clientes' table
  // We can query pg_catalog or information_schema using supabase.rpc or raw query.
  // Wait, standard supabase REST API doesn't allow querying pg_catalog directly unless we query through a postgrest view or RPC.
  // But wait! Is there any RPC or view we can use? Let's check what we can select.
  // Wait! Can we query the `clientes` table to check if there are users, or what is in there?
  const { data: clients, error: clientsError } = await supabase
    .from('clientes')
    .select('*')
    .limit(5);

  if (clientsError) {
    console.error("Error querying clientes:", clientsError);
  } else {
    console.log("Sample clientes:", clients);
  }

  // Let's check if there are columns or any constraints on 'arquivos_clientes' table.
  // Let's try to query 'arquivos_clientes' columns by selecting a non-existent column, or by fetching headers?
  // Let's try inserting a record with a valid client id from the 'clientes' table (if there is any).
  if (clients && clients.length > 0) {
    const validClientId = clients[0].id;
    console.log(`Trying to insert with a valid client_id (${validClientId})...`);
    const { data: insertData, error: insertError } = await supabase
      .from('arquivos_clientes')
      .insert({
        cliente_id: validClientId,
        nome_arquivo: 'test_valid.png',
        url_publica: 'https://example.com/test_valid.png'
      })
      .select();

    if (insertError) {
      console.error("Error inserting record with valid client_id:", insertError);
    } else {
      console.log("Successfully inserted record with valid client_id!", insertData);
      // clean it up
      await supabase.from('arquivos_clientes').delete().eq('url_publica', 'https://example.com/test_valid.png');
    }
  } else {
    console.log("No clients found in 'clientes' table to test foreign key.");
  }
}

run();
