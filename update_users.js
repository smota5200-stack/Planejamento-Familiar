const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wvncdusvpfbdsnclynxl.supabase.co';
const supabaseKey = 'sb_publishable_z4Lj8R0e1VGKav0XdvfN2w_ZQmBFsF7';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateUsers() {
  try {
    console.log('Iniciando atualização de usuários...');
    
    // Tentar registrar novo usuário smota5200@gmail.com
    console.log('\n1. Criando/atualizando smota5200@gmail.com...');
    const { data: user1, error: error1 } = await supabase.auth.signUp({
      email: 'smota5200@gmail.com',
      password: '1234',
      options: {
        data: {
          email: 'smota5200@gmail.com'
        }
      }
    });
    
    if (error1) {
      console.log('   Aviso:', error1.message);
    } else {
      console.log('   ✅ Usuário criado:', user1.user?.email);
    }
    
    // Tentar registrar novo usuário elainex2018@gmail.com
    console.log('\n2. Criando/atualizando elainex2018@gmail.com...');
    const { data: user2, error: error2 } = await supabase.auth.signUp({
      email: 'elainex2018@gmail.com',
      password: '1234',
      options: {
        data: {
          email: 'elainex2018@gmail.com'
        }
      }
    });
    
    if (error2) {
      console.log('   Aviso:', error2.message);
    } else {
      console.log('   ✅ Usuário criado:', user2.user?.email);
    }
    
    console.log('\n✅ Processo concluído!');
    console.log('\nCredenciais para login:');
    console.log('   Email: smota5200@gmail.com | Senha: 1234');
    console.log('   Email: elainex2018@gmail.com | Senha: 1234');
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

updateUsers();
