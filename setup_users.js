import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wvncdusvpfbdsnclynxl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z4Lj8R0e1VGKav0XdvfN2w_ZQmBFsF7';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function setupUsers() {
  console.log('🔄 Criando usuários no Supabase...\n');

  const users = [
    { email: 'smota5200@gmail.com', password: '123456', name: 'Sérgio Mota' },
    { email: 'elainex2018@gmail.com', password: '123456', name: 'Elaine' }
  ];

  for (const user of users) {
    try {
      console.log(`📧 Criando ${user.email}...`);
      
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.name
          }
        }
      });

      if (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ⚠️  Usuário já existe! Você pode fazer login com essas credenciais.\n`);
        } else {
          console.log(`   ❌ Erro: ${error.message}\n`);
        }
      } else if (data.user) {
        console.log(`   ✅ Criado com sucesso!`);
        console.log(`      Email: ${data.user.email}`);
        console.log(`      ID: ${data.user.id}\n`);
      }
    } catch (error) {
      console.error(`   ❌ Erro: ${error.message}\n`);
    }
  }

  console.log('✨ Processo concluído!');
  console.log('\n🔗 Credenciais para login:');
  console.log('   1️⃣  Email: smota5200@gmail.com | Senha: 123456');
  console.log('   2️⃣  Email: elainex2018@gmail.com | Senha: 123456');
  console.log('\n🚀 Acesse: https://planejamento-familiar-pi.vercel.app');
}

setupUsers();
