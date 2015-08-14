dev:
	# kill existing simple-inspector process
	@-pkill -f 'seq-server'
	# kill existing tmux session
	@-tmux kill-session -t seq-server
	@tmux new -d -s seq-server 'make server'
	@tmux bind-key r respawn-pane \; bind-key k kill-session
	@tmux set -g set-remain-on-exit on
	@tmux set set-remain-on-exit on
	@tmux split-window -d -v 'make build'
	@tmux split-window -d -h
	@tmux attach

server:
	@echo "Starting seq-server..."
	babel-node server

build:
	@echo "Starting build..."
	webpack --watch --progress

clean:
	-rm -rf build

.PHONY: dev server build clean

