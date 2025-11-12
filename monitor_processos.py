import psutil
import time
import os

# Nomes suspeitos (edite conforme seu caso)
suspeitos = ['rifbot.exe', 'engine.dll', 'bot', 'hook']

print("🔍 Monitorando acessos entre processos (pressione Ctrl+C para parar)...\n")

def monitorar_acessos():
    while True:
        for proc in psutil.process_iter(['pid', 'name']):
            try:
                filho = psutil.Process(proc.info['pid'])
                filhos = filho.children(recursive=True)
                for subproc in filhos:
                    if subproc.name().lower() in suspeitos:
                        print(f"[!] 🚨 Processo '{proc.name()}' acessou '{subproc.name()}' (PID: {subproc.pid})")
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        # Procurar por nomes suspeitos em todos os processos abertos
        for proc in psutil.process_iter(['pid', 'name']):
            try:
                nome = proc.name().lower()
                for termo in suspeitos:
                    if termo in nome:
                        print(f"[!] ⚠️ Processo suspeito ativo: {proc.name()} (PID: {proc.pid})")
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        time.sleep(5)  # Verifica a cada 5 segundos

if __name__ == "__main__":
    try:
        monitorar_acessos()
    except KeyboardInterrupt:
        print("\n❌ Monitoramento encerrado.")
