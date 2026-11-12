import AppKit
import Foundation

// macOS標準のヒラギノで文字を組む。フォントファイル自体は配布しない。
// プロジェクトのルートで swift scripts/generate-ogp.swift を実行する。
let root = URL(fileURLWithPath: CommandLine.arguments[0]).standardizedFileURL
    .deletingLastPathComponent().deletingLastPathComponent()
let width = 1200
let height = 630
let textColor = NSColor(srgbRed: 36 / 255, green: 40 / 255, blue: 36 / 255, alpha: 1)
let backgroundURL = root.appendingPathComponent("design/ogp/background.png")
guard let background = NSImage(contentsOf: backgroundURL) else {
    fatalError("背景画像を読み込めません: \(backgroundURL.path)")
}

// フォントがない環境では代替書体にせず停止し、意図しない画像の更新を防ぐ。
func font(_ name: String, size: CGFloat) -> NSFont {
    guard let value = NSFont(name: name, size: size), value.familyName == "Hiragino Sans" else {
        fatalError("macOSのヒラギノ角ゴシックが必要です: \(name)")
    }
    return value
}

func drawText(_ text: String, top: CGFloat, size: CGFloat, face: String, kern: CGFloat = 0) {
    var currentSize = size
    var line: NSAttributedString
    repeat {
        line = NSAttributedString(string: text, attributes: [
            .font: font(face, size: currentSize),
            .foregroundColor: textColor,
            .kern: kern
        ])
        if line.size().width <= 570 { break }
        currentSize -= 1
    } while currentSize >= 24
    precondition(line.size().width <= 570, "文字が左側の領域に収まりません")
    // AppKitの座標は左下原点なので、上からの位置を変換する。
    line.draw(at: NSPoint(x: 64, y: CGFloat(height) - top - line.size().height))
}

for (name, path) in [("ムニエル", "public/ogp.png"), ("Munieru", "public/en/ogp.png")] {
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height,
        bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
        colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0
    ), let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
        fatalError("描画領域を作成できません")
    }
    bitmap.size = NSSize(width: width, height: height)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    context.imageInterpolation = .high
    context.shouldAntialias = true
    background.draw(in: NSRect(x: 0, y: 0, width: width, height: height))
    drawText(name, top: 160, size: 128, face: "HiraginoSans-W7", kern: -2)
    drawText("OFFICIAL SITE", top: 340, size: 64, face: "HiraginoSans-W6", kern: -1)
    drawText("munieru.jp", top: 455, size: 44, face: "HiraginoSans-W3")
    NSGraphicsContext.restoreGraphicsState()
    guard let data = bitmap.representation(using: .png, properties: [:]) else {
        fatalError("PNGの書き出しに失敗しました")
    }
    let output = root.appendingPathComponent(path)
    try FileManager.default.createDirectory(at: output.deletingLastPathComponent(), withIntermediateDirectories: true)
    try data.write(to: output)
    print("\(path): \(width)×\(height), Hiragino Sans, \(data.count) bytes")
}
